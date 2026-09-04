import { Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { LoginComponent } from '@app/auth/login.component';
import { HomeComponent } from '@app/home/home.component';
import { SearchComponent } from '@app/search/search/search.component';
import { ParseFoldersComponent } from '@app/tools/parse-folders/parse-folders.component';
import { PublisherComponent } from '@app/publisher/publisher/publisher.component';
import { ComicComponent } from '@app/publisher/comic/comic.component';
import { AboutComponent } from '@app/about/about.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: marker('Login') } },
  Shell.childRoutes([
    { path: '', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    { path: 'publisher', component: PublisherComponent, data: { title: marker('Publishers') } },
    { path: 'publisher/:publisher', component: ComicComponent, data: { title: marker('Comics') } },
    { path: 'search', component: SearchComponent, data: { title: marker('Search') } },
    { path: 'tools', component: ParseFoldersComponent, data: { title: marker('Parse folders') } },
    { path: 'about', component: AboutComponent, data: { title: marker('About') } },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/publisher', pathMatch: 'full' },
];
