import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { ComicResolved } from '@app/@shared/models';

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
