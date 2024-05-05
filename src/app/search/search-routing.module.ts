import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'search', component: SearchComponent, data: { title: marker('Search') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SearchRoutingModule {}
