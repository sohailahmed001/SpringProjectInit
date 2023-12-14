import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Authority } from 'src/app/model/app-user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-manage-authorities',
  templateUrl: './manage-authorities.component.html',
  styleUrls: ['./manage-authorities.component.scss']
})
export class ManageAuthoritiesComponent implements OnInit {
  @ViewChild('authTable') authTable: Table;

  authorities: any[] = [];
  showLoader = false;
  showEditAuthorityPopup: boolean = false;
  selectedAuthority: Authority;

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit(): void {
    this.getAllAuthorities();
  }

  getAllAuthorities() {
    this.showLoader = true;
    this.userService.getAllAuthorities({}).subscribe(
      {
        next: (data) => {
          this.authorities = data;
          this.showLoader = false;
        },
        error: (er) => {
          this.utilsService.handleError(er);
          this.showLoader = false;
        }
      }
    )
  }

  onAddClick() {
    this.selectedAuthority = new Authority();
    this.showEditAuthorityPopup = true;
  }

  getFilterValue(event: Event): void {
    let targetValue = event.target as HTMLInputElement;
    this.authTable.filterGlobal(targetValue.value, 'contains');
  }

  onEditRoleClick(authority: any) {
    this.selectedAuthority = authority;
    this.showEditAuthorityPopup = true;
  }

  onDeleteRoleClick(authority: any) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure you wat to delete this authority?',
      accept: () => {
        this.utilsService.deleteObjects('api/authorities', authority.id).subscribe({
          next: (data: any) => {
            this.utilsService.handleSuccessMessage('Deleted Authority');
            this.getAllAuthorities();
          },
          error: (error: any) => {
            this.utilsService.handleError(error);
          }
        })
      }
    })
  }

  onSaveRoleClick() {
    this.showLoader = true;
    this.utilsService.saveObjects("api/authorities", this.selectedAuthority).subscribe({
      next: (data: any) => {
        this.utilsService.handleSuccessMessage('Saved Authority');
        this.showEditAuthorityPopup = false;
        this.getAllAuthorities();
        this.showLoader = false;
      },
      error: (error: any) => {
        this.utilsService.handleError(error);
        this.showLoader = false;
      }
    });
  }
}
