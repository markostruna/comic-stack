import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/@shared/helper.service';
import { PublisherResolved } from '@app/@shared/models';
import { PublisherService } from '../publisher.service';

type PublisherViewModel = PublisherResolved & {
  cssClass: string;
};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublisherComponent implements OnInit {
  publishersFolder = 'Publishers/';
  publishers: PublisherViewModel[] = [];

  constructor(
    private router: Router,
    private publisherService: PublisherService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        this.publishers = publishers.map((publisher) => ({
          ...publisher,
          cssClass: this.helperService.transformTitleToFilename(publisher.name),
        }));
        this.cdr.markForCheck();
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
