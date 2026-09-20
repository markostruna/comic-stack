import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { CredentialsService } from './credentials.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  private readonly credentialsService = inject(CredentialsService);
  private readonly router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.credentialsService.credentials?.role === 'admin' ? true : this.router.parseUrl('/publisher');
  }
}
