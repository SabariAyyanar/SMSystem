import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { StudentsettingsComponent } from './components/studentsettings/studentsettings.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { NotifcationsComponent } from './components/notifcations/notifcations.component';
import { ExaminationsComponent } from './components/examinations/examinations.component';
import { GeneralComponent } from './components/general/general.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PayrollsettingComponent } from './components/payrollsetting/payrollsetting.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,FormsModule,ReactiveFormsModule,ComboBoxModule
    ,GridModule,MaterialDesignModule
  ],
  declarations: [StudentsettingsComponent,NotifcationsComponent,ExaminationsComponent,GeneralComponent,
      EmployeesComponent,PayrollsettingComponent,StudentsettingsComponent]
})
export class SettingsModule { }
