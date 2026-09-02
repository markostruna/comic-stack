import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { UntilDestroy, untilDestroyed } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  isMobile = false;
  menuOpen = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private breakpoint: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.isMobile = state.matches;
        this.menuOpen = !this.isMobile;
        this.cdr.markForCheck();
      });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.cdr.markForCheck();
  }

  closeMenuOnMobile(): void {
    if (!this.isMobile) {
      return;
    }

    this.menuOpen = false;
    this.cdr.markForCheck();
  }
}
