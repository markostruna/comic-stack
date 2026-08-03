import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BrowsingService } from './browsing.service';

describe('BrowsingService', () => {
  let service: BrowsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BrowsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
