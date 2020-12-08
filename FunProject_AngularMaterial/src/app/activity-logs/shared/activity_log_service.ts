import { Injectable, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {IActivityLog} from './activity_log_model';


@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  
  private headers: HttpHeaders;
  private accessPointUrl: string = environment.appUrl+'api/ActivityLog';


  constructor(private http:HttpClient) 
  { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }


  getActivityLogs()  {
    return this.http.get<IActivityLog[]>(this.accessPointUrl+'/GetAllActivityLogs')
    .pipe(catchError(this.handleError<IActivityLog[]>('getActivityLogs',[])));
  }


  private handleError<T> (operation='operation', result?:T)
  {
    return (error:any): Observable<T>=>{
      console.error(error);
      return of(result as T);
    }

  }


}



