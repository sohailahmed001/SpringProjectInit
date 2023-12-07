import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/model/app-user.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user1 = new AppUser();
    const user2 = new AppUser();
    const user3 = new AppUser();

    user1.username = 'admin'
    user2.username = 'amy';
    user3.username = 'adam';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  onUserNameClick(event: any, user: any) {
    console.log('User', user);
    this.router.navigate(['/edit-user', 12]);
  }
}
