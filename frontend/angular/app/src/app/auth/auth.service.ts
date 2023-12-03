import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/app-user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwtToken: string;
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

    // add this method to all HTTP requests that require authentication
    addJWTTokenToHeader(headers: HttpHeaders): HttpHeaders {
        const jwtToken = this.getJWTToken();

        if (jwtToken) {
            return headers.append(this.PROJECT_PREFIX + 'Authorization', jwtToken);
        }
        return headers;
    }
}
