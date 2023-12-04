import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class AuthGuardService {

    constructor(private router: Router,
        private authService: AuthService,
        private jwtService: JwtHelperService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const jwtToken = this.authService.getJWTToken();
        const isExpired = this.jwtService.isTokenExpired(jwtToken);

        if (jwtToken && !isExpired) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    };
}

export const AuthGuard: CanActivateFn = ((next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuardService).canActivate(next, state);
})

