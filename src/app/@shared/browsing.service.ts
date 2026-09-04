import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowsingService {
  private http = inject(HttpClient);

  headers = new HttpHeaders().set('Content-Type', 'text/html;charset=UTF-8');

  getPublishers(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(catchError(this.error));
  }

  getComics(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
