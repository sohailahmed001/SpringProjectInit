import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

export const authRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const PROJECT_PREFIX = environment.PROJECT_PREFIX;
    const jwtToken = sessionStorage.getItem(PROJECT_PREFIX + "Authorization");
    const helper = new JwtHelperService();
    
    const isExpired = helper.isTokenExpired(jwtToken);
  
    if (jwtToken && !isExpired) {
        return true;
    }
    router.navigate(['/login']);
    return false;
}