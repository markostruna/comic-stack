import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ConfigurationMockService } from './configuration.mock.service';

describe('ConfigurationMockService', () => {
  let service: ConfigurationMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
