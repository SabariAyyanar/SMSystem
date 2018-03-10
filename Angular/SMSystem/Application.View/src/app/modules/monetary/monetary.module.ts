import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { MonetaryRoutingModule } from './monetary-routing.module';
import { ExpenseComponent } from './expense/expense.component';
import { FeesComponent } from './fees/fees.component';
import { IncomeComponent } from './income/income.component';
import { PayrollComponent } from './payroll/payroll.component';
import { LoanComponent } from './loan/loan.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AddexpenseComponent } from './expense/components/addexpense/addexpense.component';
import { EditexpenseComponent } from './expense/components/editexpense/editexpense.component';
import { ManagefeesComponent } from './fees/components/managefees/managefees.component';
import { AddincomeComponent } from './income/components/addincome/addincome.component';
import { EditincomeComponent } from './income/components/editincome/editincome.component';
import { ManageepayrollComponent } from './payroll/components/manageepayroll/manageepayroll.component';
import { SetpayrollComponent } from './payroll/components/setpayroll/setpayroll.component';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  imports: [
    CommonModule,
    MonetaryRoutingModule,MaterialDesignModule,ComboBoxModule,GridModule,FormsModule,ReactiveFormsModule,
  ],
  declarations: [ExpenseComponent,FeesComponent,IncomeComponent,LoanComponent,PayrollComponent
    ,AddexpenseComponent,EditexpenseComponent,ManagefeesComponent,AddincomeComponent
    ,EditincomeComponent,ManageepayrollComponent,SetpayrollComponent]
})
export class MonetaryModule { }
