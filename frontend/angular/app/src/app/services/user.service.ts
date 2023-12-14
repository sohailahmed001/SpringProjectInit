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

    getAllAuthorities(params: any): Observable<any> {
      return this.utilsService.getObjects('api/authorities', params);
    }

    getAllUsers(params: any): Observable<any> {
      return this.utilsService.getObjects('api/users', params);
    }

    getUserById(id: number) {
      return this.utilsService.getObjectByID('api/users', id);
    }

    getAllRoles(params: any): Observable<any> {
      return this.utilsService.getObjects('api/roles', params);
    }
}
