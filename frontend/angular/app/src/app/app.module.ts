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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MessagesModule,
    FullLayoutComponentModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
