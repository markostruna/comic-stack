import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComicService } from './comic.service';

describe('ComicService', () => {
  let service: ComicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(ComicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
