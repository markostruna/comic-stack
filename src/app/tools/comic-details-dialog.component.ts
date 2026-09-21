import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComicResolved } from '@app/@shared/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comic-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton, TranslateModule],
  templateUrl: './comic-details-dialog.component.html',
  styleUrls: ['./comic-details-dialog.component.scss'],
})
export class ComicDetailsDialogComponent {
  readonly comic = inject<ComicResolved>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ComicDetailsDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
