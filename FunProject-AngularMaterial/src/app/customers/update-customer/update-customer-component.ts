import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {CustomerService} from '../shared/customer.service';
import {NotificationService} from '../../shared/notification.service';
import { ICustomer } from '../shared/customer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-updateCustomer',
  templateUrl: './update-customer-component.html'
})
export class UpdateCustomerComponent implements OnInit {
  CustomerOperationName:string;
  constructor(public service: CustomerService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<UpdateCustomerComponent>,
    private router:Router) {
      this.CustomerOperationName = "Modify Customer";
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    
   }

  ngOnInit() {
    
  }
  
  onClear()
  {
    this.service.form.reset();
    this.service.iniializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid)
    {
      this.updateCustomer(this.service.form.value); 
      this.service.form.reset();
      this.service.iniializeFormGroup();
      this.notificationService.success('::Submitted successfully');
      
    }
  }

  onClose(){
      this.service.form.reset();
      this.service.iniializeFormGroup();
      this.notificationService.success('::Submitted successfully');
      this.dialogRef.close();
      this.router.navigate(['/customers']);
    }
  
  updateCustomer(customer:ICustomer)
  {
    this.service.updateCustomer(customer).subscribe(()=>{
      this.onClose();
    });
  }

}
