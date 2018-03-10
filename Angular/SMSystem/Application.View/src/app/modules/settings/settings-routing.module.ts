import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { ExaminationsComponent } from './components/examinations/examinations.component';
import { GeneralComponent } from './components/general/general.component';
import { NotifcationsComponent } from './components/notifcations/notifcations.component';
import { PayrollsettingComponent } from './components/payrollsetting/payrollsetting.component';
import { StudentsettingsComponent } from './components/studentsettings/studentsettings.component';

const routes: Routes = [
  {path: 'employee', component: EmployeesComponent},
  {path: 'examination', component: ExaminationsComponent},
  {path: 'general', component: GeneralComponent},
  {path: 'notification', component: NotifcationsComponent},
  {path: 'payroll', component: PayrollsettingComponent},
  {path: 'student', component: StudentsettingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
