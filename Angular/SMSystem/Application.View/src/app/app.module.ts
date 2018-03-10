import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { EmployeeserviceService } from './service/employee.service.service';
import {LoginService} from './service/login.service';
import {StorageService} from './service/storage.service';
import {Interceptor} from './service/Interceptor';
import {OauthGuard} from './guard/oauth.guard';
import {StudentService} from './service/student.service';
import {PaymentService} from './service/payment.service';
import { PayrollService} from './service/payroll.service';
import { CollectionService} from './service/collections.required';
import { LoaderService} from './service/loader.service';
import { ExternalService } from './service/external.service';
import { MiscellaneousService } from './service/miscellaneous.service';
import { EditService} from './service/exam.service';
import { TemplateEditService } from './service/BehaviorialService/templatebehavourial.service';
import { TemplateCrudService } from './service/BehaviorialService/template.service';

import { HandleNumberDirective} from './service/handlenumbers';

import { AppComponent } from './app.component';
import { MydialogcomponentComponent } from './mydialogcomponent/mydialogcomponent.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyeditdialogComponent } from './dialog/myeditdialog/myeditdialog.component';
import { SidebaritemComponent } from './navigation/components/sidebaritem/sidebaritem.component';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';



@NgModule({
  declarations: [
    AppComponent,
    MydialogcomponentComponent,HandleNumberDirective,NavigationComponent
    ,MyeditdialogComponent,SidebaritemComponent,
  ],

  imports: [
      BrowserModule,FormsModule,AppRoutingModule,BrowserAnimationsModule,HttpClientModule
      ,ReactiveFormsModule,MaterialDesignModule,ComboBoxModule,GridModule,
  ],

  entryComponents:[
    MydialogcomponentComponent,MyeditdialogComponent
  ],

  providers: [
    EmployeeserviceService,StorageService,OauthGuard,LoginService,CollectionService,
    TemplateEditService,TemplateCrudService,
    LoaderService,ExternalService,StudentService,PaymentService,EditService,
    MiscellaneousService,PayrollService,{provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,multi: true,}
  ],

  bootstrap: [AppComponent]
  
})
export class AppModule { }
