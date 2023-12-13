import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent {
  username: string;
  password: string;
  showLoader = false;

  constructor(public utilsService: UtilsService, private userService: UserService, private router: Router) { }

  onSignInClick() {
    this.utilsService.clearErrorMessages();

    this.showLoader = true;

    let userObj = {
      username: this.username,
      password: this.password,
    }

    this.utilsService.saveObjects("api/register", userObj).subscribe(
      {
        next: (data) => {
          this.showLoader = false;
          this.router.navigate(['login']);
        },
        error: (er) => {
          this.showLoader = false;
          console.log("error called");
          this.utilsService.handleError(er);
        }
      }
    )
  }
}
