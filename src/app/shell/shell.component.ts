import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { UntilDestroy, untilDestroyed } from '@shared';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LanguageSelectorComponent } from '../i18n/language-selector.component';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbar,
    TranslateModule,
    MatNavList,
    MatDivider,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    LanguageSelectorComponent,
    RouterOutlet,
  ],
})
export class ShellComponent implements OnInit {
  readonly isMobile = signal(false);
  readonly menuOpen = signal(false);

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly credentialsService = inject(CredentialsService);
  private readonly breakpoint = inject(BreakpointObserver);
  readonly username = this.credentialsService.credentials?.username ?? '';

  ngOnInit() {
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.isMobile.set(state.matches);
        this.menuOpen.set(!state.matches);
      });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenuOnMobile(): void {
    if (!this.isMobile()) {
      return;
    }

    this.menuOpen.set(false);
  }
}
