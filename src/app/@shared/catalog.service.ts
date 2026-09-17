import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ComicResolved, PublisherResolved } from './models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);

  readPublishers(): Observable<PublisherResolved[]> {
    return this.http.get<PublisherResolved[]>(`${environment.apiUrl}publishers`);
  }

  readComics(publisher?: string): Observable<ComicResolved[]> {
    const url = publisher
      ? `${environment.apiUrl}publishers/${encodeURIComponent(publisher)}/comics`
      : `${environment.apiUrl}comics?pageSize=10000`;
    return this.http
      .get<ComicResolved[] | { items: ComicResolved[] }>(url)
      .pipe(map((response) => (Array.isArray(response) ? response : response.items)));
  }

  searchComics(filters: object): Observable<ComicResolved[]> {
    let params = new HttpParams().set('pageSize', '10000');
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') params = params.set(key, value);
    });
    return this.http
      .get<{ items: ComicResolved[] }>(`${environment.apiUrl}comics`, { params })
      .pipe(map((response) => response.items));
  }

  readSearchOptions(): Observable<{ heroes: string[]; publishers: string[]; collections: string[] }> {
    return this.http.get<{ heroes: string[]; publishers: string[]; collections: string[] }>(
      `${environment.apiUrl}search/options`
    );
  }
}
