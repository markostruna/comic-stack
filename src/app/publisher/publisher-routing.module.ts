import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { PublisherComponent } from './publisher/publisher.component';
import { ComicComponent } from './comic/comic.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'publisher', component: PublisherComponent, data: { title: marker('Publishers') } },
    { path: 'publisher/:publisher', component: ComicComponent, data: { title: marker('Comics') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PublisherRoutingModule {}
