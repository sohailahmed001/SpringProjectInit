import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/app-user.model';
import { getCookie } from 'typescript-cookie';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private jwtToken: string;
    private xsrfToken: string;
    baseURL = environment.baseURL;
    errorMessages: any[];
    PROJECT_PREFIX: string = environment.PROJECT_PREFIX;

    constructor(private http: HttpClient) { }

    login(userDetails: AppUser): Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + window.btoa(userDetails.username + ':' + userDetails.password),
        });

        return this.http.get(this.baseURL + "api/login", { observe: 'response',withCredentials: true, headers: httpHeaders })
            .pipe(
                map((data: any) => {
                    console.log(data);
                    return data;
                })
            );
    }

    logout(): void {
        this.jwtToken = null;
        sessionStorage.removeItem(this.PROJECT_PREFIX + 'Authorization');
        sessionStorage.removeItem(this.PROJECT_PREFIX + 'XSRF-TOKEN');
    }

    getJWTToken(): string {
        if (!this.jwtToken) {
            this.jwtToken = sessionStorage.getItem(this.PROJECT_PREFIX + 'Authorization');
        }
        return this.jwtToken;
    }

    isLoggedIn(): boolean {
        const token = this.getJWTToken();
        return token != null;
    }

    getUser(): any {
        // do nothing
    }

    setJWTToken(jwt){
        sessionStorage.setItem(this.PROJECT_PREFIX + 'Authorization', jwt);
    }

    // add this method to all HTTP requests that require authentication
    addJWTTokenToHeader(headers: HttpHeaders): HttpHeaders {
        const jwtToken = this.getJWTToken();

        console.log('Token', jwtToken)
        if (jwtToken) {
            return headers.append('Authorization', jwtToken);
        }
        return headers;
    }

    getXSRFToken(){
        if (!this.xsrfToken) {
            return sessionStorage.getItem(this.PROJECT_PREFIX + 'XSRF-TOKEN');
        }

        return this.xsrfToken;
    }

    setXSRFToken(xsrf){
        sessionStorage.setItem(this.PROJECT_PREFIX + "XSRF-TOKEN", xsrf);
    }

    processAuthData(data: any) {
        const jwtToken = data.headers.get('Authorization');
        const xsrf = getCookie('XSRF-TOKEN');
    
        if (jwtToken) {
            this.setJWTToken(jwtToken);
        }
    
        if (xsrf) {
            this.setXSRFToken(xsrf);
        }
    }
}
