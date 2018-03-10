import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { StudentAttendanceComponent } from './components/students/student-attendance/student-attendance.component';
import { StudentFeedingComponent } from './components/students/student-feeding/student-feeding.component';
import { EmployeeAttendanceComponent } from './components/employees/employee-attendance/employee-attendance.component';
import { EmployeeFeedingComponent } from './components/employees/employee-feeding/employee-feeding.component';
import { StudentsComponent } from './components/students/students/students.component';
import { ManageemployeesComponent } from './components/employees/employee/components/manageemployees/manageemployees.component';
import { ManagestudentsComponent } from './components/students/students/components/managestudents/managestudents.component';
import { ExaminationComponent } from './components/students/examination/examination.component';
import { AddmarksComponent } from './components/students/examination/components/addmarks/addmarks.component';
import { PrintComponent } from './components/students/examination/components/print/print.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({

  imports: [
    CommonModule,ComboBoxModule,GridModule,
    EntitiesRoutingModule,MaterialDesignModule,FormsModule,ReactiveFormsModule
  ],

  declarations: [EmployeeComponent, StudentAttendanceComponent,StudentsComponent,
                StudentAttendanceComponent, StudentFeedingComponent,ExaminationComponent,
                AddmarksComponent,PrintComponent,EmployeeAttendanceComponent,
                EmployeeFeedingComponent,EmployeeComponent,ManageemployeesComponent,
                ManagestudentsComponent]
})
export class EntitiesModule { }
