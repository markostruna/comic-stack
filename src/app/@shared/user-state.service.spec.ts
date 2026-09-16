import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { environment } from '@env/environment';
import { Bookmark, UserStateService } from './user-state.service';

describe('UserStateService', () => {
  let service: UserStateService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserStateService],
    });

    service = TestBed.inject(UserStateService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should read bookmarks', async () => {
    const bookmarks: Bookmark[] = [
      {
        id: 1,
        comicId: 42,
        pageIndex: 3,
        note: null,
        createdAt: '2026-01-01T00:00:00Z',
      },
    ];
    const request = firstValueFrom(service.readBookmarks());

    http.expectOne(`${environment.apiUrl}bookmarks`).flush(bookmarks);

    expect(await request).toEqual(bookmarks);
  });

  it('should create and delete bookmarks', async () => {
    const createRequest = firstValueFrom(service.createBookmark(42, 3, 'great page'));
    const createHttpRequest = http.expectOne(`${environment.apiUrl}bookmarks`);
    expect(createHttpRequest.request.method).toBe('POST');
    expect(createHttpRequest.request.body).toEqual({ comicId: 42, pageIndex: 3, note: 'great page' });
    createHttpRequest.flush({ id: 7 });
    expect(await createRequest).toEqual({ id: 7 });

    const deleteRequest = firstValueFrom(service.deleteBookmark(7));
    const deleteHttpRequest = http.expectOne(`${environment.apiUrl}bookmarks/7`);
    expect(deleteHttpRequest.request.method).toBe('DELETE');
    deleteHttpRequest.flush({ ok: true });
    expect(await deleteRequest).toEqual({ ok: true });
  });

  it('should read and update settings', async () => {
    const settings = { readingMode: 'double' };
    const readRequest = firstValueFrom(service.readSettings());
    http.expectOne(`${environment.apiUrl}settings`).flush(settings);
    expect(await readRequest).toEqual(settings);

    const updateRequest = firstValueFrom(service.updateSettings(settings));
    const updateHttpRequest = http.expectOne(`${environment.apiUrl}settings`);
    expect(updateHttpRequest.request.method).toBe('PUT');
    expect(updateHttpRequest.request.body).toEqual(settings);
    updateHttpRequest.flush({ ok: true });
    expect(await updateRequest).toEqual({ ok: true });
  });

  it('should read continue reading entries', async () => {
    const entries = [{ id: 42, title: 'Issue 1', pageIndex: 3, totalPages: 20, updatedAt: '2026-01-01T00:00:00Z' }];
    const request = firstValueFrom(service.readContinueReading());

    http.expectOne(`${environment.apiUrl}continue-reading`).flush(entries);

    expect(await request).toEqual(entries);
  });
});
