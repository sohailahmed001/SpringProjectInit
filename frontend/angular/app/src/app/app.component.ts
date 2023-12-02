import { Component } from '@angular/core';
import { UtilsService } from './utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public utilsService: UtilsService){}

}
