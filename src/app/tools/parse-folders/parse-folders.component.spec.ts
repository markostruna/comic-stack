import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { ConfigurationService } from '@app/@shared/configuration.service';
import { PublisherService } from '@app/publisher/publisher.service';

import { ParseFoldersComponent } from './parse-folders.component';

describe('ParseFoldersComponent', () => {
  let component: ParseFoldersComponent;
  let fixture: ComponentFixture<ParseFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule, MatPaginatorModule, ParseFoldersComponent],
      providers: [
        {
          provide: PublisherService,
          useValue: {
            getPublishers: () => of([]),
            getComics: () => of([]),
          },
        },
        {
          provide: ConfigurationService,
          useValue: {
            writeFile: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParseFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
