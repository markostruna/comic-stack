import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [MatCard, MatCardTitle, TranslateModule, MatCardContent, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  readonly version: string | null = environment.version;

  constructor() {}

  ngOnInit() {}
}
