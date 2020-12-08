import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CustomersModule} from './customers/customers.module';
import { RouterModule } from '@angular/router';
import {AcitvityLogsModule} from './activity-logs/acitvity-logs.module';

import {AppComponent} from './app.component';
import{NavBarComponent} from './nav/navbar.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

import{NotificationService} from './shared/notification.service';

import {appRoutes} from './routes';


@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomersModule,
    AcitvityLogsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
