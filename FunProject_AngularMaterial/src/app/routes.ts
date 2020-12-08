
import {Routes} from '@angular/router'
import { ActivityLogListComponent } from './activity-logs/activity_log_list/activity_log_list_component'
import { CustomerListComponent } from './customers/customer-list/customer-list.component'

export const appRoutes: Routes = [   
  {
    path: 'customers', 
    component: CustomerListComponent
  },
  {
    path: 'logs', 
    component: ActivityLogListComponent
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
]
