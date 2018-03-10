import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule,MatNativeDateModule,MatButtonModule,MatDatepickerModule 
      ,MatSelectModule,MatSidenavModule,MatDialogModule,MatTabsModule,MatCheckboxModule
      ,MatCardModule,MatTooltipModule,MatRadioModule,MatSnackBarModule,MatMenuModule,MatAutocompleteModule
      ,MatToolbarModule,MatTableModule,MatPaginatorModule,MatExpansionModule}
       from '@angular/material';
import {MatIconModule} from '@angular/material/icon';



import { EmployeeserviceService } from './service/employee.service.service';
import {LoginService} from './service/login.service';
import {StorageService} from './service/storage.service';
import {Interceptor} from './service/Interceptor';
import {OauthGuard} from './guard/oauth.guard';
import {StudentService} from './service/student.service';
import {PaymentService} from './service/payment.service';
import {PayrollService} from './service/payroll.service';
import {CollectionService} from './service/collections.required';
import {LoaderService} from './service/loader.service';
import { ExternalService } from './service/external.service';
import { MiscellaneousService } from './service/miscellaneous.service';
import {EditService} from './service/exam.service';
import {HandleNumberDirective} from './service/handlenumbers';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { MydialogcomponentComponent } from './mydialogcomponent/mydialogcomponent.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EmployeeComponent } from './employee/employee.component';
import { ExaminationComponent } from './examination/examination.component';
import { SettingComponent } from './setting/setting.component';
import { MyeditdialogComponent } from './dialog/myeditdialog/myeditdialog.component';
import { ManagestudentsComponent } from './students/components/managestudents/managestudents.component';
import { ManagefeesComponent } from './fees/components/managefees/managefees.component';
import { ManageemployeesComponent } from './employee/components/manageemployees/manageemployees.component';
import { ManageepayrollComponent } from './payroll/components/manageepayroll/manageepayroll.component';
import { GeneralComponent } from './setting/components/general/general.component';
import { EmployeesComponent } from './setting/components/employees/employees.component';
import { ExaminationsComponent } from './setting/components/examinations/examinations.component';
import { StudentsettingsComponent } from './setting/components/studentsettings/studentsettings.component';
import { NotifcationsComponent } from './setting/components/notifcations/notifcations.component';
import { PayrollComponent } from './payroll/payroll.component';
import { SetpayrollComponent } from './payroll/components/setpayroll/setpayroll.component';
import { ReportsComponent } from './reports/reports.component';
import { MonetaryComponent } from './monetary/monetary.component';
import { LoanComponent } from './monetary/components/loan/loan.component';
import { SidebaritemComponent } from './navigation/components/sidebaritem/sidebaritem.component';
import { AddmarksComponent } from './examination/components/addmarks/addmarks.component';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { PrintComponent } from './examination/components/print/print.component';
import { HostelComponent } from './hostel/hostel.component';
import { LibraryComponent } from './library/library.component';
import { TransportComponent } from './transport/transport.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { FeesComponent } from './fees/fees.component';
import { PayrollsettingComponent } from './setting/components/payrollsetting/payrollsetting.component';
import { AddincomeComponent } from './income/components/addincome/addincome.component';
import { EditincomeComponent } from './income/components/editincome/editincome.component';
import { TemplateEditService } from './service/BehaviorialService/templatebehavourial.service';
import { TemplateCrudService } from './service/BehaviorialService/template.service';
import { AddexpenseComponent } from './expense/components/addexpense/addexpense.component';
import { EditexpenseComponent } from './expense/components/editexpense/editexpense.component';
import { BookComponent } from './library/components/book/book.component';
import { BookcategoryComponent } from './library/components/bookcategory/bookcategory.component';
import { ClassbookComponent } from './library/components/classbook/classbook.component';
import { LendbookComponent } from './library/components/lendbook/lendbook.component';
import { AddhostelComponent } from './hostel/components/addhostel/addhostel.component';
import { EdithostelComponent } from './hostel/components/edithostel/edithostel.component';



@NgModule({
  declarations: [
    AppComponent,DashboardComponent,PagenotfoundComponent,LoginComponent,HomeComponent,StudentsComponent,
    MydialogcomponentComponent,HandleNumberDirective,NavigationComponent,MyeditdialogComponent,
    EmployeeComponent, ExaminationComponent, SettingComponent, ManagestudentsComponent, ManagefeesComponent,
     ManageemployeesComponent, ManageepayrollComponent, GeneralComponent, EmployeesComponent, 
     ExaminationsComponent, StudentsettingsComponent, NotifcationsComponent, PayrollComponent, 
     SetpayrollComponent, ReportsComponent, MonetaryComponent, LoanComponent, SidebaritemComponent, 
     AddmarksComponent, PrintComponent, HostelComponent, LibraryComponent, TransportComponent, IncomeComponent, ExpenseComponent, FeesComponent, PayrollsettingComponent, AddincomeComponent, EditincomeComponent, AddexpenseComponent, EditexpenseComponent, BookComponent, BookcategoryComponent, ClassbookComponent, LendbookComponent, AddhostelComponent, EdithostelComponent
  ],

  imports: [
    BrowserModule,FormsModule,MatTabsModule,MatToolbarModule,AppRoutingModule,MatCheckboxModule,
    HttpClientModule,MatCardModule,MatMenuModule,MatIconModule,MatSidenavModule,MatPaginatorModule,
    MatTableModule,MatInputModule,MatButtonModule ,MatSnackBarModule,MatRadioModule,MatExpansionModule,
    MatSelectModule,BrowserAnimationsModule,MatDialogModule,MatTooltipModule,MatDatepickerModule,
    MatNativeDateModule,MatAutocompleteModule,ReactiveFormsModule,ComboBoxModule,GridModule,
  ],

  entryComponents:[
    MydialogcomponentComponent,MyeditdialogComponent
  ],

  providers: [
    EmployeeserviceService,StorageService,OauthGuard,LoginService,CollectionService,TemplateEditService,
    TemplateCrudService,
    LoaderService,ExternalService,StudentService,PaymentService,EditService,MiscellaneousService,
    PayrollService,{provide: HTTP_INTERCEPTORS,useClass: Interceptor,multi: true,}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
