import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  username: string;
  password: string;
  showLoader = false;

  constructor(private router: Router,
    private authService: AuthService, 
    public utilsService: UtilsService) { }

  onLoginClick() {
    this.utilsService.clearErrorMessages();

    this.showLoader = true;

    const loginObj = {
      username: this.username,
      password: this.password
    }

    this.authService.login(loginObj).subscribe(
      {
        next: (data) => {
          this.utilsService.handleSuccessMessage("Login Successfull");

          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1200);

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
