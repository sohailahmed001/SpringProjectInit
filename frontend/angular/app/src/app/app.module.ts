import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FullLayoutComponentModule } from './utils/full-layout-component/full-layout-component.module';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ManageAuthoritiesComponent } from './components/manage-authorities/manage-authorities.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './routeguards/auth.routeguard';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { SearchRoleComponent } from './components/search-role/search-role.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchUserComponent,
    EditUserComponent,
    SearchRoleComponent,
    ManageAuthoritiesComponent,
    EditRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ConfirmDialogModule,
    TableModule,
    MessagesModule,
    ToolbarModule,
    FullLayoutComponentModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    },
    {
      provide: JWT_OPTIONS,
      useValue: {} // Provide your JWT_OPTIONS configuration here if needed
    },
    JwtHelperService,
    AuthGuardService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
