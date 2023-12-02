import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class RegistrationComponent {
  firstname : string;
  lastname: string;
  username: string;
  password: string;
  submitted = false;
  showLoader = false;

  constructor( private utilsService : UtilsService , 
              private router : Router){}

  onSignInClick() {
    this.submitted = true;
    
    let userObj = {
      username : this.username,
      password : this.password,
    }

    this.utilsService.saveObjects("api/register", userObj).subscribe(
      {
        next: (data) => {
          this.utilsService.handleSuccessMessage("Registration Successfull");
          this.router.navigate(['login']);
        },
        error : (er) => {
          console.log("error called");
          this.utilsService.handleError(er);
        }
      }
    )
  }
}
