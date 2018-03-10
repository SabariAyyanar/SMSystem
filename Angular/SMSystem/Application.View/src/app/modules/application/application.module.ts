import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [LoginComponent,DashboardComponent,
    PagenotfoundComponent, UsersComponent]
})
export class ApplicationModule { }
