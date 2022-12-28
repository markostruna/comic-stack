import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import {
  COMICS_DATA_LUNOV_MAGNUS_STRIP,
  COMICS_DATA_LUNOV_ZLATNA_SERIJA,
  COMICS_DATA_SLOBODNA_DALMACIJA,
  COMICS_DATA_VESELI_CETVRTAK,
  PUBLISHER_DATA,
} from './mock-data/demo.data';

export interface DemoDataMap {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrowsingService {
  headers = new HttpHeaders().set('Content-Type', 'text/html;charset=UTF-8');

  demoDataMap: DemoDataMap = {};

  constructor(private http: HttpClient) {
    this.demoDataMap['Publishers/Zlatna%20Serija/'] = COMICS_DATA_LUNOV_ZLATNA_SERIJA;
    this.demoDataMap['Publishers/Lunov%20Magnus%20Strip/'] = COMICS_DATA_LUNOV_MAGNUS_STRIP;
    this.demoDataMap['Publishers/Slobodna%20Dalmacija/'] = COMICS_DATA_SLOBODNA_DALMACIJA;
    this.demoDataMap['Publishers/Veseli%20%c4%8cetvrtak/'] = COMICS_DATA_VESELI_CETVRTAK;
  }

  getPublishers(url: string): Observable<any> {
    // if (!environment.production) {
    // return of(PUBLISHER_DATA);
    // }

    return this.http.get(url, { responseType: 'text' }).pipe(catchError(this.error));
  }

  getComics(url: string): Observable<any> {
    // if (!environment.production) {
    // return of(this.demoDataMap[url]);
    // }

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
