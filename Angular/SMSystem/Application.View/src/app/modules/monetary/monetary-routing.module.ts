import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from './payroll/payroll.component';
import { LoanComponent } from './loan/loan.component';
import { IncomeComponent } from './income/income.component';
import { FeesComponent } from './fees/fees.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  {path: 'expense', component: ExpenseComponent},
  {path: 'fees', component: FeesComponent},
  {path: 'income', component: IncomeComponent},
  {path: 'loan', component: LoanComponent},
  {path: 'payroll', component: PayrollComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonetaryRoutingModule { }
