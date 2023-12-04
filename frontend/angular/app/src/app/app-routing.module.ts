import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routing';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './auth/layout/layout.component';
import { FullLayoutComponent } from './utils/full-layout-component/full-layout/full-layout.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { authRouteGuard } from './routeguards/auth.routeguard';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ManageAuthoritiesComponent } from './components/manage-authorities/manage-authorities.component';
import { AuthGuard } from './routeguards/auth.routeguard';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path : '',
    component : FullLayoutComponent,
    children : [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search-user',
        component: SearchUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-authority',
        component: ManageAuthoritiesComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [...authRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
