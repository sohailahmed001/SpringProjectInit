import { Component, OnInit } from '@angular/core';
import { TITLE } from 'src/app/utils/constant';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  title = TITLE;

  constructor(private utilsService : UtilsService){}

  ngOnInit(): void {
    // do nothing
  }
}
