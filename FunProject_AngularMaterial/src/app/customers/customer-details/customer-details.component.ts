import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {CustomerService} from '../shared/customer.service';
import {NotificationService} from '../../shared/notification.service';
import { ICustomer } from '../shared/customer.model';
import {Router} from '@angular/router';
import { Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customerDetails',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {
   
    customerData!: MatTableDataSource<ICustomer>;
    displayedColumns:string[]=['id', 'firstName','lastName'];

   customerDetails!: ICustomer;
  constructor(public service: CustomerService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<CustomerDetailsComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    
   }

  ngOnInit() {

      this.service.getCustomer(this.data).subscribe((customer:ICustomer) => {
        this.customerData = new MatTableDataSource(new Array(customer));
      }, (error: any) => console.error(error));
  }
  
  onClose(){
    this.service.form.reset();
    this.service.iniializeFormGroup();
    this.dialogRef.close();
    this.router.navigate(['/customers']);
  }

 
}