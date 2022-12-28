import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publisher } from './models/publisher.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationMockService {
  constructor() {}

  getPublishers(): Observable<Publisher[]> {
    const publishers: Publisher[] = [
      {
        name: 'Publisher 1',
        path: 'Path 1',
      },
      {
        name: 'Publisher 2',
        path: 'Path 2',
      },
      {
        name: 'Publisher 3',
        path: 'Path 3',
      },
    ];

    return of(publishers);
  }
}
