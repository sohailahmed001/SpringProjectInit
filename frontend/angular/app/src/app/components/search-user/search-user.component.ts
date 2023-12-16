import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AppUser } from 'src/app/model/app-user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  users: any[] = [];
  @ViewChild('dt') postTable: Table;

  constructor(private router: Router, private userService: UserService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers({}).subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error) => {
        this.utilsService.handleError(error);
      }
    })
  }

  onUserNameClick(event: any, user: AppUser) {
    this.router.navigate(['/edit-user', user.id]);
  }

  onRowSelect(rowData){
    this.router.navigate(['/edit-user', rowData.id]);
  }

  onAddClick(event: any) {
    this.router.navigate(['/edit-user', 0]);
  }

  getFilterValue(event: Event): void {
    let targetValue = event.target as HTMLInputElement;
    this.postTable.filterGlobal(targetValue.value, 'contains');
  }

  onSearchClick(){

  }
}
