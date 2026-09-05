import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogService } from '@app/@shared/catalog.service';
import { ComicResolved } from '@app/@shared/models';

@Component({
  selector: 'app-comic-edit-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatIcon, TranslateModule],
  templateUrl: './comic-edit-dialog.component.html',
  styleUrls: ['./comic-edit-dialog.component.scss'],
})
export class ComicEditDialogComponent implements OnInit {
  comic: ComicResolved;
  isChecking = true;
  isSaving = false;

  private readonly catalogService = inject(CatalogService);
  private readonly dialogRef = inject(MatDialogRef<ComicEditDialogComponent>);
  private readonly data = inject<ComicResolved>(MAT_DIALOG_DATA);

  constructor() {
    this.comic = { ...this.data, heroes: [...(this.data.heroes ?? [])], titles: [...(this.data.titles ?? [])] };
  }

  ngOnInit(): void {
    this.comic = {
      ...this.comic,
      missing: this.comic.extension.toLowerCase() === 'jpg',
      comicMissing: this.comic.extension.toLowerCase() === 'jpg',
    };
    this.isChecking = false;
  }

  save(): void {
    this.isSaving = true;
    this.comic.titles = this.comic.titlesResolved
      .split(' / ')
      .map((title) => title.trim())
      .filter(Boolean);
    this.comic.heroes = this.comic.heroesResolved
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({ name, imagePath: '' }));
    this.comic.missing = this.comicFileMissing();
    this.comic.comicMissing = this.comicFileMissing();
    this.catalogService.saveComic(this.comic).subscribe({
      next: () => this.dialogRef.close(this.comic),
      error: () => (this.isSaving = false),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  imageAvailable(missing: boolean | null): boolean {
    return missing !== true;
  }

  comicFileMissing(): boolean {
    return this.comic.extension.trim().toLowerCase() === 'jpg';
  }

  thumbnailLoaded(): void {
    this.recordImageAvailability('thumbnailMissing', false);
  }

  thumbnailFailed(): void {
    this.recordImageAvailability('thumbnailMissing', true);
  }

  coverLoaded(): void {
    this.recordImageAvailability('coverMissing', false);
  }

  coverFailed(): void {
    this.recordImageAvailability('coverMissing', true);
  }

  private recordImageAvailability(field: 'thumbnailMissing' | 'coverMissing', missing: boolean): void {
    this.catalogService.recordAvailability(this.comic, field, missing).subscribe((updated) => {
      this.comic = updated;
    });
  }
}
