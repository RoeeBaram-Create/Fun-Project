import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityLogService } from '../shared/activity_log_service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import {IActivityLog} from '../shared/activity_log_model';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {ActionType} from '../shared/action_type_enum';

@Component({
  selector: 'app-activityLog-list',
  templateUrl: './activity_log_list_component.html'
})

export class ActivityLogListComponent implements OnInit {
  ActionType:typeof
  ActionType = ActionType;
  listData!: MatTableDataSource<any>;
  displayedColumns:string[]=['id','customerId','customerFullName','actionType', 'activityDate'];
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey: string;

 

  constructor(private service: ActivityLogService,
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
      this.service.getActivityLogs().subscribe((activityLogs:IActivityLog[]) => {

        this.listData = new MatTableDataSource(activityLogs);
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


}


