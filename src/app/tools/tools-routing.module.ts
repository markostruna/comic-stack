import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ParseFoldersComponent } from './parse-folders/parse-folders.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'tools', component: ParseFoldersComponent, data: { title: marker('Parse folders') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ToolsRoutingModule {}
