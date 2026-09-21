import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthenticationGuard, AuthenticationService } from '../auth';
import { MockAuthenticationService } from '../auth/authentication.service.mock';
import { ShellComponent } from './shell.component';
import { Shell } from './shell.service';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [AuthenticationGuard, { provide: AuthenticationService, useClass: MockAuthenticationService }],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
