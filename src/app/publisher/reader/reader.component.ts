import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class ReaderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  readonly title = signal('Comic reader');
  readonly source = signal<SafeResourceUrl | undefined>(undefined);
  readonly downloadUrl = signal('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const path = params.get('path');
      if (!path) {
        this.source.set(undefined);
        return;
      }

      const url = environment.serverUrl + path;
      this.title.set(params.get('title') || 'Comic reader');
      this.downloadUrl.set(url);
      this.source.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }
}
