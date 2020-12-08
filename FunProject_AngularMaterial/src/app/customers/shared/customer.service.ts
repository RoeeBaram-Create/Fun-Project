import { Injectable, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {ICustomer} from './customer.model'


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private headers: HttpHeaders;
  private accessPointUrl: string = environment.appUrl+'api/Customer';


  constructor(private http:HttpClient) 
  { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required)
  });

  iniializeFormGroup(){
    this.form.setValue({
      id: 0,
      firstName : '',
      lastName : ''
    })
  }

  getCustomers()  {
    return this.http.get<ICustomer[]>(this.accessPointUrl+'/GetAllCustomers')
    .pipe(catchError(this.handleError<ICustomer[]>('getCustomers',[])));
  }

  getCustomer(id?:number)  {
    return this.http.get<ICustomer>(this.accessPointUrl+'/GetCustomerDetails/'+id)
    .pipe(catchError(this.handleError<ICustomer>('getCustomer')));
  }

  insertCustomer(customer:ICustomer)
  {
    return this.http.post<ICustomer>(this.accessPointUrl+'/CreateCustomer', customer, {headers: this.headers})
    .pipe(catchError(this.handleError<ICustomer>('insertCustomer')));

  }

  updateCustomer(customer:ICustomer)
  {
    return this.http.put<ICustomer>(this.accessPointUrl+'/EditCustomer', customer, {headers: this.headers})
    .pipe(catchError(this.handleError<ICustomer>('updateCustomer')));
  }

  deleteCustomer(id?: number)
  {
    return this.http.delete(this.accessPointUrl+'/DeleteCustomer/'+id)
    .pipe(catchError(this.handleError('deleteCustomer'))).subscribe();
  }

  populateForm(customer:ICustomer)
  {
    this.form.patchValue(customer);
  }

  private handleError<T> (operation='operation', result?:T)
  {
    return (error:any): Observable<T>=>{
      console.error(error);
      return of(result as T);
    }

  }


}



