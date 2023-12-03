import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TITLE } from 'src/app/utils/constant';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  title = TITLE;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    // do nothing
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
