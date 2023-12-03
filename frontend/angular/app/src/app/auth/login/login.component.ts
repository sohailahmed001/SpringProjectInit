import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { AppUser } from 'src/app/model/app-user.model';
import { environment } from 'src/environments/environment';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  username: string;
  password: string;
  showLoader = false;
  PROJECT_PREFIX: string = environment.PROJECT_PREFIX;

  constructor(private router: Router,
    private authService: AuthService, 
    public utilsService: UtilsService) { }

  onLoginClick() {
    this.utilsService.clearErrorMessages();

    this.showLoader = true;

    const user = new AppUser();
    user.username = this.username;
    user.password = this.password;

    this.authService.login(user).subscribe(
      {
        next: (data) => {
          this.utilsService.handleSuccessMessage("Login Successfull");
          const jwtToken = data.headers.get('Authorization');
          const xsrf = getCookie('XSRF-TOKEN');

          if(jwtToken) {
            sessionStorage.setItem(this.PROJECT_PREFIX + 'Authorization', jwtToken);
          }

          if(xsrf) {
            sessionStorage.setItem(this.PROJECT_PREFIX + "XSRF-TOKEN", xsrf);
          }


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
