import { Routes } from '@angular/router';
import {PartsComponent} from './parts/parts.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PartDetailsComponent} from './part-details/part-details.component';
import {UsersComponent} from './users/users.component';
import {BuildsComponent} from './builds/builds.component';
import {BuildAddComponent} from './build-add/build-add.component';
import {BuildsDetailsComponent} from './builds-details/builds-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/builds/1', pathMatch: 'full' },
  { path: 'builds/:id', component: BuildsComponent },
  { path: 'build-add/users/:uid/builds/:bid', component: BuildAddComponent },
  { path: 'builds-details/:uid/builds/:bid', component: BuildsDetailsComponent },
  { path: 'components', component: PartsComponent },
  { path: 'components/:id', component: PartDetailsComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: '**', component: PageNotFoundComponent}
];
