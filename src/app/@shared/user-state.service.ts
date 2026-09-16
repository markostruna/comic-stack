import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface Bookmark {
  id: number;
  comicId: number;
  pageIndex: number;
  note: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly http = inject(HttpClient);

  readBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${environment.apiUrl}bookmarks`);
  }

  createBookmark(comicId: number, pageIndex: number, note?: string): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.apiUrl}bookmarks`, { comicId, pageIndex, note });
  }

  deleteBookmark(bookmarkId: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${environment.apiUrl}bookmarks/${bookmarkId}`);
  }

  readSettings(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${environment.apiUrl}settings`);
  }

  updateSettings(settings: Record<string, unknown>): Observable<{ ok: boolean }> {
    return this.http.put<{ ok: boolean }>(`${environment.apiUrl}settings`, settings);
  }

  readContinueReading(): Observable<
    Array<{ id: number; title: string; pageIndex: number; totalPages: number; updatedAt: string }>
  > {
    return this.http.get<
      Array<{ id: number; title: string; pageIndex: number; totalPages: number; updatedAt: string }>
    >(`${environment.apiUrl}continue-reading`);
  }
}
