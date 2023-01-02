import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/@shared/helper.service';
import { PublisherResolved } from '@app/@shared/models/all-models';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements OnInit {
  publishersFolder = 'Publishers/';
  publishers: PublisherResolved[] = [];

  constructor(
    private router: Router,
    private publisherService: PublisherService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        this.publishers = publishers;
      },
    });
  }

  openFolder(path: string, name: string): void {
    console.log('Path: ', path, ' Name: ', name);
    this.router.navigate(['/publisher/' + name]);
  }

  getPublisherClass(item: PublisherResolved) {
    let ret = '';

    if (item) {
      ret = this.helperService.transformTitleToFilename(item.name);
    }

    return ret;
  }
}
