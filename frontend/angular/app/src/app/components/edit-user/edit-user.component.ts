import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/app-user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user:AppUser = new AppUser();

  ngOnInit(): void {
    this.user.username = 'Timothy@1234';
  }

}
