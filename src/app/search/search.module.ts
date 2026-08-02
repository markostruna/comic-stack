import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SearchRoutingModule } from './search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
})
export class SearchModule {}
