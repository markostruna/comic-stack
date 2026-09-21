import { Routes } from '@angular/router';
import { AboutComponent } from '@app/about/about.component';
import { AdminGuard } from '@app/auth/admin.guard';
import { LoginComponent } from '@app/auth/login.component';
import { ComicComponent } from '@app/publisher/comic/comic.component';
import { PublisherComponent } from '@app/publisher/publisher/publisher.component';
import { ReaderComponent } from '@app/publisher/reader/reader.component';
import { SearchComponent } from '@app/search/search/search.component';
import { Shell } from '@app/shell/shell.service';
import { ParseFoldersComponent } from '@app/tools/parse-folders/parse-folders.component';
import { BookmarksComponent } from '@app/user/bookmarks.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: marker('Login') } },
  Shell.childRoutes([
    { path: '', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'home', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'publisher', component: PublisherComponent, data: { title: marker('Publishers') } },
    { path: 'publisher/:publisher', component: ComicComponent, data: { title: marker('Comics') } },
    { path: 'reader/:comicId', component: ReaderComponent, data: { title: marker('Reader') } },
    { path: 'bookmarks', component: BookmarksComponent, data: { title: marker('Bookmarks') } },
    { path: 'search', component: SearchComponent, data: { title: marker('Search') } },
    {
      path: 'tools',
      component: ParseFoldersComponent,
      canActivate: [AdminGuard],
      data: { title: marker('Parse folders') },
    },
    { path: 'about', component: AboutComponent, data: { title: marker('About') } },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/publisher', pathMatch: 'full' },
];
