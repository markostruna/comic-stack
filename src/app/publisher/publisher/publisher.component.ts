import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/@shared/helper.service';
import { PublisherResolved } from '@app/@shared/models';
import { PublisherService } from '../publisher.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type PublisherViewModel = PublisherResolved & {
  cssClass: string;
};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TranslateModule],
})
export class PublisherComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly publisherService = inject(PublisherService);
  private readonly helperService = inject(HelperService);

  readonly publishersFolder = 'Publishers/';
  readonly publishers = signal<PublisherViewModel[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        this.publishers.set(
          publishers.map((publisher) => ({
            ...publisher,
            cssClass: this.helperService.transformTitleToFilename(publisher.name),
          }))
        );
      },
    });
  }

  openFolder(path: string, name: string): void {
    console.log('Path: ', path, ' Name: ', name);
    this.router.navigate(['/publisher/' + name]);
  }

  trackByPublisher(_index: number, item: PublisherViewModel): string {
    return item.path;
  }
}
