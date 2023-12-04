import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { AppUser } from 'src/app/model/app-user.model';
import { environment } from 'src/environments/environment';

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
          this.authService.processAuthData(data);

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
