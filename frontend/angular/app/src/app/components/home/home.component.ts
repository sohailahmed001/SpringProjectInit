import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TITLE } from 'src/app/utils/constant';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  title = TITLE;

  constructor(private router: Router){}

  ngOnInit(): void {
    // do nothing
  }

  onLogoutClick(){
    this.router.navigate(['login']);
  }
}
