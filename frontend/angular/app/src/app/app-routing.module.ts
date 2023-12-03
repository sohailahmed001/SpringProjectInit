import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authRoutes } from './auth/auth.routing';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './auth/layout/layout.component';
import { FullLayoutComponent } from './utils/full-layout-component/full-layout/full-layout.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { authRouteGuard } from './routeguards/auth.routeguard';

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
        canActivate: [authRouteGuard]
      },
      {
        path: 'search-user',
        component: SearchUserComponent,
        canActivate: [authRouteGuard]
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
