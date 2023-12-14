import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import { getCookie } from 'typescript-cookie';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  PROJECT_PREFIX: string = environment.PROJECT_PREFIX;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpHeaders = req.headers;

    if(httpHeaders.get('Authorization') == null) {
      httpHeaders = this.authService.addJWTTokenToHeader(req.headers);
      const xsrfToken = this.authService.getXSRFToken();

      if(xsrfToken) {
        httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrfToken);
      }

      httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    }

    const xhr = req.clone({
      headers: httpHeaders
    });

    return next.handle(xhr).pipe(tap(
      (err: any) => {
        if(err instanceof HttpErrorResponse) {
          console.log(err);
        }
      }
    ))
  }
}
