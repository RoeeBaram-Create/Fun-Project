import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import{NotificationService} from '../shared/notification.service';

import {ActivityLogService} from './shared/activity_log_service';
import {ActivityLogListComponent} from './activity_log_list/activity_log_list_component';

@NgModule({
  declarations: [
    ActivityLogListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  providers: [ActivityLogService, NotificationService]
})
export class AcitvityLogsModule { }
