import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { LoaderComponent } from '../@shared/loader/loader.component';
import { LanguageSelectorComponent } from '../i18n/language-selector.component';
import { AuthenticationService } from './authentication.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    TranslateModule,
    LanguageSelectorComponent,
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatSlideToggle,
    MatButton,
    LoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authenticationService = inject(AuthenticationService);

  readonly version: string | null = environment.version;
  readonly error = signal<string | undefined>(undefined);
  readonly loginForm: FormGroup;
  readonly isLoading = signal(false);

  constructor() {
    this.loginForm = this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading.set(true);
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading.set(false);
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error.set(error);
        }
      );
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
