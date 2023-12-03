import { Component, HostListener, OnInit } from '@angular/core';
import { UtilsService } from '../../utils.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {

  isDesktop: boolean = false;
  showSideBar = true;

  constructor(public utilsService: UtilsService, 
    public authService : AuthService){}

  ngOnInit(): void {
    this.checkScreenSize();
    this.showSideBar = this.isDesktop;
  }

  hideSideBar(){
    this.showSideBar = false;
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(event: any = null) {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
      this.isDesktop = true;
      this.showSideBar = true;
    } else {
      this.showSideBar = false;
      this.isDesktop = false;
    }
  }
 
}
