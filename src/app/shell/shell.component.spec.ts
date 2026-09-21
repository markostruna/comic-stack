import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { beforeEach, describe, it } from 'vitest';

import { AuthenticationService, CredentialsService } from '../auth';
import { MockAuthenticationService } from '../auth/authentication.service.mock';
import { MockCredentialsService } from '../auth/credentials.service.mock';

import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ShellComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CredentialsService, useClass: MockCredentialsService },
        provideRouter([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    if (!component) {
      throw new Error('ShellComponent was not created');
    }
  });
});
