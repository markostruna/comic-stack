import { Routes } from '@angular/router';
import { AdminGuard } from '@app/auth/admin.guard';
import { PublisherComponent } from '@app/publisher/publisher/publisher.component';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@app/auth/login.component').then((module) => module.LoginComponent),
    data: { title: marker('Login') },
  },
  Shell.childRoutes([
    { path: '', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'home', redirectTo: '/publisher', pathMatch: 'full' },
    { path: 'publisher', component: PublisherComponent, data: { title: marker('Publishers') } },
    {
      path: 'publisher/:publisher',
      loadComponent: () => import('@app/publisher/comic/comic.component').then((module) => module.ComicComponent),
      data: { title: marker('Comics') },
    },
    {
      path: 'reader/:comicId',
      loadComponent: () => import('@app/publisher/reader/reader.component').then((module) => module.ReaderComponent),
      data: { title: marker('Reader') },
    },
    {
      path: 'bookmarks',
      loadComponent: () => import('@app/user/bookmarks.component').then((module) => module.BookmarksComponent),
      data: { title: marker('Bookmarks') },
    },
    {
      path: 'search',
      loadComponent: () => import('@app/search/search/search.component').then((module) => module.SearchComponent),
      data: { title: marker('Search') },
    },
    {
      path: 'tools',
      loadComponent: () =>
        import('@app/tools/parse-folders/parse-folders.component').then((module) => module.ParseFoldersComponent),
      canActivate: [AdminGuard],
      data: { title: marker('Parse folders') },
    },
    {
      path: 'about',
      loadComponent: () => import('@app/about/about.component').then((module) => module.AboutComponent),
      data: { title: marker('About') },
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/publisher', pathMatch: 'full' },
];
