import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import{NotificationService} from '../shared/notification.service';

import {CustomerService} from '../customers/shared/customer.service';


import { CustomerListComponent } from '../customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from '../customers/customer-details/customer-details.component';
import { CreateCustomerComponent } from '../customers/create-customer/create-customer-component';
import { UpdateCustomerComponent } from '../customers/update-customer/update-customer-component';


@NgModule({
  declarations: [
    CustomerDetailsComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
   
  ],

  providers: [CustomerService, NotificationService]
})

export class CustomersModule { }
