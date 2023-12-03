import { Component, HostListener } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  items: any[] = [];
  verticalItems: MenuItem[] = [];
  isDesktop: boolean = false;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'fa fa-home',
        routerLink: '/home'
      },
      {
        label: 'Security',
        icon: 'fa fa-cog',
        items: [{
          label: 'Users',
          icon: 'fa fa-users',
          routerLink: '/search-user'
        },
        {
          label: 'Roles',
          icon: 'fa fa-lock',
          routerLink: '/search-role'
        },
        {
          label: 'Privileges',
          icon: 'fa fa-key',
          routerLink: '/search-priv'
        }
      ]
      },
    ];

    this.verticalItems = this.items;
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(event: any = null) {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
      this.isDesktop = true;
    } else {
      this.isDesktop = false;
    }
  }
}
