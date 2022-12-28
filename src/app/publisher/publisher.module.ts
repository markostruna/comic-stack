import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherComponent } from './publisher/publisher.component';
import { PublisherRoutingModule } from './publisher-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComicComponent } from './comic/comic.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [PublisherComponent, ComicComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    PublisherRoutingModule,
    ScrollingModule,
  ],
})
export class PublisherModule {}
