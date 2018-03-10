import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EmployeeComponent } from './employee/employee.component';
import { ExaminationComponent } from './examination/examination.component';
import { SettingComponent } from './setting/setting.component';
import {ReportsComponent} from './reports/reports.component';
import { MonetaryComponent } from './monetary/monetary.component';

import {OauthGuard} from './guard/oauth.guard';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { HostelComponent } from './hostel/hostel.component';
import { TransportComponent } from './transport/transport.component';
import { LibraryComponent } from './library/library.component';
import { FeesComponent } from './fees/fees.component';
import { PayrollComponent } from './payroll/payroll.component';


const appRoutes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'student',canActivate:[OauthGuard], component:StudentsComponent},
  {path:'home',canActivate:[OauthGuard], component:HomeComponent},
  {path:'navigation', component:NavigationComponent},
  {path:'employee', canActivate:[OauthGuard],component:EmployeeComponent},
  {path:'examination', canActivate:[OauthGuard],component:ExaminationComponent},
  {path:'report', canActivate:[OauthGuard],component:ReportsComponent},
  {path:'setting', canActivate:[OauthGuard],component:SettingComponent},
  {path:'monetary', canActivate:[OauthGuard],component:MonetaryComponent},
  {path:'library', canActivate:[OauthGuard],component:LibraryComponent},
  {path:'transport', canActivate:[OauthGuard],component:TransportComponent},
  {path:'hostel', canActivate:[OauthGuard],component:HostelComponent},
  {path:'income', canActivate:[OauthGuard],component:IncomeComponent},
  {path:'expense', canActivate:[OauthGuard],component:ExpenseComponent},
  {path:'fees', canActivate:[OauthGuard],component:FeesComponent},
  {path:'payroll', canActivate:[OauthGuard],component:PayrollComponent},
  {path:'', redirectTo:'/student',pathMatch:'full'},
  {path:'**', component:PagenotfoundComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports:[RouterModule]
})
export class AppRoutingModule { }
