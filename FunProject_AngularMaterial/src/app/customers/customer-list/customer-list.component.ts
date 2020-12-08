import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../shared/customer.service'
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import {ICustomer} from '../shared/customer.model';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {CustomerDetailsComponent} from '../customer-details/customer-details.component';
import { CreateCustomerComponent } from '../create-customer/create-customer-component';
import { UpdateCustomerComponent } from '../update-customer/update-customer-component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  listData!: MatTableDataSource<any>;
  displayedColumns:string[]=['firstName','lastName','actions'];
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey: string;

  constructor(private service: CustomerService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService:DialogService,
    private router:Router
    )
    
      {
        this.searchKey = "";
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
      };

      }

  ngOnInit() {

      this.service.getCustomers().subscribe((customers:ICustomer[]) => {
        console.log(customers);
        this.listData = new MatTableDataSource(customers);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;   
      }, (error: any) => console.error(error));
    }
      
  onSearchClear()
  {
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter()
  {
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onCreate()
  {
    this.service.iniializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateCustomerComponent, dialogConfig);
    
  }

  onEdit(customerRow:ICustomer)
  {
    this.service.populateForm(customerRow);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UpdateCustomerComponent, dialogConfig);
    
  }

  onInfo(costomerId:number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = costomerId;
    this.dialog.open(CustomerDetailsComponent, dialogConfig);
    
  }

  onDelete(costomerId:number)
  {
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res=>{
      if(res)
      {
        this.service.deleteCustomer(costomerId).subscribe(()=>{
          this.notificationService.warn('! Deleted successfully');
          this.router.navigate(['/customers']);
        });
      }
    });
  }
}


