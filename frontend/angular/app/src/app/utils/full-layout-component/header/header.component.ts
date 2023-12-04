import { Component, Input } from '@angular/core';
import { UtilsService } from '../../utils.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isIconRotated: boolean = false;
  @Input() parent: any;
  @Input() isAdminLoggedIn: boolean;

  items: any[] = [
    {
      label: 'Logout',
      icon: 'fa fa-power-off',
      command: ()=>{
        this.authService.logout();
        this.router.navigate(['login']);
      },
    }];

  constructor(
    private utiilsService : UtilsService,
    private authService: AuthService,
    private router: Router) {
  }

  rotateIcon() {
    this.isIconRotated = !this.isIconRotated;
    this.parent.showSideBar = !this.isIconRotated;
  }
}
