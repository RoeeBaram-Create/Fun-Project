import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {CustomerService} from '../shared/customer.service';
import {NotificationService} from '../../shared/notification.service';
import { ICustomer } from '../shared/customer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createCustomer',
  templateUrl: './create-customer-component.html'
})

export class CreateCustomerComponent implements OnInit {

  constructor(public service: CustomerService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<CreateCustomerComponent>,
    private router:Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    
   }

  ngOnInit() {
    
       
  }
 
  onSubmit(){
    if(this.service.form.valid)
    {
      this.insertCustomer(this.service.form.value);
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.iniializeFormGroup();
    this.notificationService.success('::Submitted successfully');
    this.dialogRef.close();
    this.router.navigate(['/customers']);
  }
  
  onClear()
  {
    this.service.form.reset();
    this.service.iniializeFormGroup();
  }

  insertCustomer(customer:ICustomer)
  {
    this.service.insertCustomer(customer).subscribe(()=>{
      this.onClose();
    });
  }

}
