import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BrowsingService } from './browsing.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BrowsingService', () => {
  let service: BrowsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(BrowsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
