import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService} from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private apiURL = environment.baseURL;
  public loggedInUserObj: any;

  isDesktop = false;
  isMobile = false;
  errorMessages: any[];

  constructor(private httpClient : HttpClient, 
              private msgsService : MessageService)
              {
                
              }



  getObjects(serviceName:string , queryParams : any , ) : Observable<any>{
    return this.httpClient.post(this.apiURL + serviceName , queryParams);
  }

  getObjectByID(serviceName : string , id : any){
    return this.httpClient.get(this.apiURL + serviceName + '/' + id);
  }

  saveObjects(serviceName: string , createdObj : any){
    return this.httpClient.post(this.apiURL + serviceName  , createdObj);
  }

  deleteObjects(serviceName: string , deletedObj : any){
    return this.httpClient.delete(this.apiURL + serviceName + '/' + deletedObj.id);
  }
  
  handleSuccessMessage(message : any = null){
    let detailMessage = message?.length > 0 ? message : 'Details Saved Successfully';
    this.msgsService.add({ severity: 'success', detail: detailMessage });
  }

  handleError(error: any = null) {
    let errorMessage = 'Error Occured';

    if(error)
    {
        errorMessage =  error.error?.message
    }

    this.errorMessages = [{ severity: 'error', summary: 'Error', detail: errorMessage }];
    console.log(this.errorMessages);
  }

  handleSuccess(message: string = null) {
      let msg = message || 'Details Saved Successfully';

      this.msgsService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  addNullOptions(data : any[]){
    let nullOption = {value : null , description : 'Please Select'};
    data.unshift(nullOption);
    return data;
  }

  isSuccessfulResponse(data : any){
    if(data.result == 'ok'){
      return true;
    }
    else{
      this.handleError();
      return false;
    }
  }

  getRequest(serviceName : any) : Observable<any>{
    return this.httpClient.get(this.apiURL + serviceName);
  }

}
