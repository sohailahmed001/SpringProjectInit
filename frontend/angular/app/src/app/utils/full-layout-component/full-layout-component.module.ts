import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MessagesModule } from 'primeng/messages';
import { UtilsService } from '../utils.service';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FullLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    ButtonModule,
    MessagesModule,
    PanelMenuModule,
    MenubarModule

  ],
  exports:[ButtonModule],
  providers:[UtilsService],
  bootstrap: [FullLayoutComponent]
})
export class FullLayoutComponentModule { }
