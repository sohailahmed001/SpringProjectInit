import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    baseURL = environment.baseURL;
    errorMessages: any[];

    constructor(private http: HttpClient) { }

    login(loginObj : any): Observable<any> {
        return this.http.post(this.baseURL + "api/login", loginObj)
            .pipe(
                map((data: any) => {
                    console.log(data);
                })
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('token');
    }

    getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        return token != null;
    }

    getUser(): any {
        // do nothing
    }

    // add this method to all HTTP requests that require authentication
    addTokenToHeader(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = this.getToken();
        if (token) {
            return headers.set('Authorization', 'Bearer ' + token);
        }

        return headers;
    }
}
