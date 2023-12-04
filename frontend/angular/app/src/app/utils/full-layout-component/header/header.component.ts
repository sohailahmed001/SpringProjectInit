import { Component, Input } from '@angular/core';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isIconRotated: boolean = false;
  @Input() parent: any;
  @Input() isAdminLoggedIn: boolean;

  items: any[] = [];

  constructor(
    private utiilsService : UtilsService) {
  }

  rotateIcon() {
    this.isIconRotated = !this.isIconRotated;
    this.parent.showSideBar = !this.isIconRotated;
  }
}
