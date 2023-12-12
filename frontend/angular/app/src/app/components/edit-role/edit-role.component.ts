import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/common.model';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  role: any = new Role();
  saveBtnItems: any[] = this.getSaveButtonItems();
  showLoader: boolean = false;

  constructor(private router: Router,
    private utilsService: UtilsService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // do nothing
    this.showLoader = true;

    // this.getGenderOptions();

    this.route.params.subscribe(
      (params) => {
        if(params['id'] && params['id'] !== '0'){
          this.getRoleByID(params['id']);
        }
        else{
          this.showLoader = false;
        }
      }
    )
  }


  getRoleByID(id: any) {
    this.utilsService.getObjectByID('api/roles',id).subscribe(
      {
        next : (data) => {
          this.role = data;
          this.postRoleByIDSuccess(data);
          this.showLoader = false;
        },
        error : (error) => {
          console.log(error);
          this.utilsService.handleError(error);
          this.showLoader = false;
        }
      }
    )
  }


  postRoleByIDSuccess(data: Object) {
  }

  getSaveButtonItems() {
    return [{
      label: 'Save & Back',
      icon: 'pi pi-sync'
    }]
  }

  onCancelClick() {
    this.router.navigate(['search-role']);
  }

  onSaveClick() {

  }
}
