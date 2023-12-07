import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { FullLayoutComponentModule } from './utils/full-layout-component/full-layout-component.module';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ManageAuthoritiesComponent } from './components/manage-authorities/manage-authorities.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchUserComponent,
    EditUserComponent,
    ManageAuthoritiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    AuthModule,
    MessagesModule,
    FullLayoutComponentModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    },
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
