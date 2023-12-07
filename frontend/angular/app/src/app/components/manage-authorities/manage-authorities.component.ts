import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-manage-authorities',
  templateUrl: './manage-authorities.component.html',
  styleUrls: ['./manage-authorities.component.scss']
})
export class ManageAuthoritiesComponent implements OnInit {
  authorities: any[] = [];
  showLoader = false;

  constructor(private userService: UserService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.getAllAuthorities();
  }

  getAllAuthorities() {
    this.showLoader = true;

    this.userService.getAllAuthorities().subscribe(
      {
        next: (data) => {
          this.utilsService.handleSuccessMessage("Fetched");
          console.log('Auth', data);
          this.authorities = data.body;
          this.showLoader = false;
        },
        error: (er) => {
          this.utilsService.handleError(er);
          this.showLoader = false;
        }
      }
    )
  }
}
