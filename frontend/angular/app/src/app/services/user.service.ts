import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseURL;
  PROJECT_PREFIX: string = environment.PROJECT_PREFIX;

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

    saveUser(user: any) {
      return this.utilsService.saveObjects("api/users", user);
    }

    getAllAuthorities(): Observable<any> {
        return this.http.get(this.baseURL + "api/authorities", { observe: 'response' })
            .pipe(
                map((data: any) => {
                    console.log(data);
                    return data;
                })
            );
    }

    getAllUsers(params: any): Observable<any> {
      return this.utilsService.getObjects('api/users', params);
    }

    getUserById(id: number) {
      return this.utilsService.getObjectByID('api/users', id);
    }
}
