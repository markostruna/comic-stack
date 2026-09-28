import { Routes } from '@angular/router';
import { AdminGuard } from '@app/auth/admin.guard';
import { HomeComponent } from '@app/home/home.component';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@app/auth/login.component').then((module) => module.LoginComponent),
    data: { title: marker('Login') },
  },
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Publishers') } },
    { path: 'publisher', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home/:publisher',
      loadComponent: () =>
        import('@app/@shared/components/comic-card-grid/comic-card-grid.component').then(
          (module) => module.ComicCardGridComponent
        ),
      data: { title: marker('Comics') },
    },
    { path: 'publisher/:publisher', redirectTo: '/home/:publisher' },
    {
      path: 'reader/:comicId',
      loadComponent: () =>
        import('@app/@shared/components/reader/reader.component').then((module) => module.ReaderComponent),
      data: { title: marker('Reader') },
    },
    {
      path: 'bookmarks',
      loadComponent: () => import('@app/user/bookmarks.component').then((module) => module.BookmarksComponent),
      data: { title: marker('Bookmarks') },
    },
    {
      path: 'search',
      loadComponent: () => import('@app/search/search.component').then((module) => module.SearchComponent),
      data: { title: marker('Search') },
    },
    {
      path: 'tools',
      loadComponent: () => import('@app/tools/tools.component').then((module) => module.ToolsComponent),
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
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
