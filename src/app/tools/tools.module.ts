import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseFoldersComponent } from './parse-folders/parse-folders.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ToolsRoutingModule } from './tools-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [ParseFoldersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ToolsRoutingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
})
export class ToolsModule {}
