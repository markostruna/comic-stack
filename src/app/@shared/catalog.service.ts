import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, defer, from, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { ComicResolved, PublisherResolved } from './models';

interface CatalogSnapshot {
  publishers: PublisherResolved[];
  comics: ComicResolved[];
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly databaseName = 'comic-stack-catalog';
  private readonly version = 2;
  private readonly http = inject(HttpClient);
  private readonly checks = new Map<string, Observable<ComicResolved>>();

  readPublishers(): Observable<PublisherResolved[]> {
    return defer(() => from(this.readStore<PublisherResolved>('publishers')));
  }

  readComics(publisher?: string): Observable<ComicResolved[]> {
    return defer(() =>
      from(
        this.readStore<ComicResolved>('comics').then((comics) =>
          (publisher === undefined ? comics : comics.filter((comic) => comic.publisher === publisher)).map((comic) => ({
            ...comic,
            comicMissing: comic.extension.toLowerCase() === 'jpg' ? true : comic.comicMissing ?? null,
            thumbnailMissing: comic.thumbnailMissing ?? null,
            coverMissing: comic.coverMissing ?? null,
          }))
        )
      )
    );
  }

  replaceCatalog(publishers: PublisherResolved[], comics: ComicResolved[]): Observable<void> {
    return defer(() => from(this.replaceStores({ publishers, comics })));
  }

  checkAvailability(
    comic: ComicResolved,
    field: 'comicMissing' | 'thumbnailMissing' | 'coverMissing',
    url: string
  ): Observable<ComicResolved> {
    if (field === 'comicMissing' && comic.extension.toLowerCase() === 'jpg') {
      const updated = { ...comic, missing: true, comicMissing: true };
      return this.updateComic(updated).pipe(map(() => updated));
    }

    if (comic[field] !== null) {
      return of(comic);
    }

    const key = `${comic.path}:${field}`;
    const existingCheck = this.checks.get(key);
    if (existingCheck) {
      return existingCheck;
    }

    const check = this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
      map(() => false),
      catchError(() => of(true)),
      switchMap((missing) => {
        return this.updateAvailability(comic.path, field, missing, comic);
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );
    this.checks.set(key, check);
    return check;
  }

  recordAvailability(
    comic: ComicResolved,
    field: 'thumbnailMissing' | 'coverMissing',
    missing: boolean
  ): Observable<ComicResolved> {
    if (comic[field] !== null) {
      return of(comic);
    }

    const key = `${comic.path}:${field}`;
    const existingWrite = this.checks.get(key);
    if (existingWrite) {
      return existingWrite;
    }

    const write = this.updateAvailability(comic.path, field, missing, comic).pipe(
      shareReplay({ bufferSize: 1, refCount: false })
    );
    this.checks.set(key, write);
    return write;
  }

  resetAvailability(): Observable<void> {
    this.checks.clear();
    return defer(() => from(this.resetComicAvailability()));
  }

  saveComic(comic: ComicResolved): Observable<void> {
    const normalized =
      comic.extension.toLowerCase() === 'jpg' ? { ...comic, missing: true, comicMissing: true } : comic;
    return this.updateComic(normalized);
  }

  private open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const database = request.result;
        if (!database.objectStoreNames.contains('publishers')) {
          database.createObjectStore('publishers', { keyPath: 'path' });
        }
        if (!database.objectStoreNames.contains('comics')) {
          database.createObjectStore('comics', { keyPath: 'path' });
        }
        if (event.oldVersion < 2) {
          const store = request.transaction?.objectStore('comics');
          if (store) {
            const cursorRequest = store.openCursor();
            cursorRequest.onsuccess = () => {
              const cursor = cursorRequest.result;
              if (!cursor) {
                return;
              }
              cursor.update({
                ...cursor.value,
                missing: false,
                comicMissing: null,
                thumbnailMissing: null,
                coverMissing: null,
              });
              cursor.continue();
            };
          }
        }
      };
    });
  }

  private readStore<T>(storeName: 'publishers' | 'comics'): Promise<T[]> {
    return this.open().then(
      (database) =>
        new Promise<T[]>((resolve, reject) => {
          const request = database.transaction(storeName, 'readonly').objectStore(storeName).getAll();
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result as T[]);
        })
    );
  }

  private replaceStores(snapshot: CatalogSnapshot): Promise<void> {
    return this.open().then(
      (database) =>
        new Promise<void>((resolve, reject) => {
          const transaction = database.transaction(['publishers', 'comics'], 'readwrite');
          transaction.objectStore('publishers').clear();
          transaction.objectStore('comics').clear();
          snapshot.publishers.forEach((publisher) => transaction.objectStore('publishers').put(publisher));
          snapshot.comics.forEach((comic) => transaction.objectStore('comics').put(comic));
          transaction.onerror = () => reject(transaction.error);
          transaction.oncomplete = () => resolve();
        })
    );
  }

  private updateComic(comic: ComicResolved): Observable<void> {
    return defer(() =>
      from(
        this.open().then(
          (database) =>
            new Promise<void>((resolve, reject) => {
              const transaction = database.transaction('comics', 'readwrite');
              transaction.objectStore('comics').put(comic);
              transaction.onerror = () => reject(transaction.error);
              transaction.oncomplete = () => resolve();
            })
        )
      )
    );
  }

  private updateAvailability(
    path: string,
    field: 'comicMissing' | 'thumbnailMissing' | 'coverMissing',
    missing: boolean,
    fallback: ComicResolved
  ): Observable<ComicResolved> {
    return defer(() =>
      from(
        this.open().then(
          (database) =>
            new Promise<ComicResolved>((resolve, reject) => {
              const transaction = database.transaction('comics', 'readwrite');
              const store = transaction.objectStore('comics');
              const request = store.get(path);
              request.onsuccess = () => {
                const current = (request.result as ComicResolved | undefined) ?? fallback;
                const updated = { ...current, [field]: missing } as ComicResolved;
                if (field === 'comicMissing') {
                  updated.missing = missing;
                }
                store.put(updated);
                transaction.oncomplete = () => resolve(updated);
              };
              request.onerror = () => reject(request.error);
              transaction.onerror = () => reject(transaction.error);
            })
        )
      )
    );
  }

  private resetComicAvailability(): Promise<void> {
    return this.open().then(
      (database) =>
        new Promise<void>((resolve, reject) => {
          const transaction = database.transaction('comics', 'readwrite');
          const store = transaction.objectStore('comics');
          const request = store.getAll();
          request.onsuccess = () => {
            request.result.forEach((comic: ComicResolved) => {
              const isJpg = comic.extension.toLowerCase() === 'jpg';
              store.put({
                ...comic,
                missing: isJpg,
                comicMissing: isJpg ? true : null,
                thumbnailMissing: null,
                coverMissing: null,
              });
            });
          };
          request.onerror = () => reject(request.error);
          transaction.onerror = () => reject(transaction.error);
          transaction.oncomplete = () => resolve();
        })
    );
  }
}
