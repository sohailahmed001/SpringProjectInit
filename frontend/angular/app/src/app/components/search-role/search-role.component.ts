import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-search-role',
  templateUrl: './search-role.component.html',
  styleUrls: ['./search-role.component.scss']
})
export class SearchRoleComponent implements OnInit {
  
  roles: any[];
  selectedRoles: any[];
  @ViewChild('dt') postTable : Table;

  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private utilsService: UtilsService) {

  }

  ngOnInit(): void {
  }

  onAddClick(){

  }

  getFilterValue(event: Event): void {
    let targetValue = event.target as HTMLInputElement;
    this.postTable.filterGlobal(targetValue.value, 'contains');
  }

  editRole(rowData){

  }

  deleteRole(rowData){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected role?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.utilsService.handleSuccess("Roles Deleted Successfully");
      }
    });
  }
}
