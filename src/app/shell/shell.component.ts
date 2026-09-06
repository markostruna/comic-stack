import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LanguageSelectorComponent } from '../i18n/language-selector.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
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
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly credentialsService = inject(CredentialsService);
  readonly username = this.credentialsService.credentials?.username ?? '';

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
