import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAttendanceComponent } from './components/students/student-attendance/student-attendance.component';
import { StudentFeedingComponent } from './components/students/student-feeding/student-feeding.component';
import { StudentsComponent } from './components/students/students/students.component';
import { EmployeeFeedingComponent } from './components/employees/employee-feeding/employee-feeding.component';
import { EmployeeAttendanceComponent } from './components/employees/employee-attendance/employee-attendance.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { ExaminationComponent } from './components/students/examination/examination.component';

const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'employeeattendance', component: EmployeeAttendanceComponent},
  {path: 'employeefeeding', component: EmployeeFeedingComponent},
  {path: 'student', component: StudentsComponent},
  {path: 'studentattendance', component: StudentAttendanceComponent},
  {path: 'studentfeeding', component: StudentFeedingComponent},
  {path: 'studentexamination', component: ExaminationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
