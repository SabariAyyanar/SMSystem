import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Register} from '../models/register';
import 'rxjs/add/operator/map';
import {StorageService} from './storage.service';
import {PayrollRate, EmployeeLoanHistory, EmployeeLoan, PayrollAmount, PayrollDate} from '../models/payrollmodel';
import { ExternalService } from './external.service';

@Injectable()
export class PayrollService {

  constructor(private _http: HttpClient,private storage:StorageService
            ,private externalService:ExternalService) {
                this.loadPrerequisiteData();

             }


  BaseUrl: string = this.storage.BaseUrl;
  employeeloan:EmployeeLoan[];
  employeeloanhistory:EmployeeLoanHistory[];
  allpayrollamount:PayrollAmount[];
  allpayrolldate:PayrollDate[];
  
  //methods to retrieve variable data
  
  getAllEmployeeLoan():EmployeeLoan[]{    
    return this.employeeloan;
  }

  getAllPayrollAmount():PayrollAmount[]{    
    return this.allpayrollamount;
  }
  
  getAllEmployeeLoanHistory():EmployeeLoanHistory[]{    
    return this.employeeloanhistory;
  }

  getAllPayrollDate():PayrollDate[]{    
    return this.allpayrolldate;
  }


   //Loading required data and storing it in its variables
      private loadPrerequisiteData(){
        this.GetAllEmployeeloan().subscribe((response)=>this.employeeloan = response
                                        ,(err)=>{this.externalService.logError(err)});
        this.GetAllEmployeeloanHistory().subscribe((response)=>this.employeeloanhistory = response
                                                  ,(err)=>{this.externalService.logError(err)});

        this.GetAllPayrollAmount().subscribe((response)=>this.allpayrollamount = response
        ,(err)=>{this.externalService.logError(err)});

        this.GetAllPayrollDate().subscribe((response)=>this.allpayrolldate = response
        ,(err)=>{this.externalService.logError(err)});
      } 


//CRUD For Employee history
//BEGIN Employee loan
GetAllEmployeeloan():Observable<EmployeeLoan[]>{
return this._http.get(this.BaseUrl + "/api/Employee/GetAllEmployeeloan")
.map((response:EmployeeLoan[])=> <EmployeeLoan[]>response)
}

AddNewEmployeeLoan(params:EmployeeLoan){
let header = new HttpHeaders();
header.append('Content-Type','application/json; charset=utf-8');  
return this._http.post(this.BaseUrl + '/api/Employee/AddNewEmployeeLoan',params,{headers:header})
}


UpdateOldEmployeeLoan(params:EmployeeLoan){
let header = new HttpHeaders();
header.append('Content-Type','application/json; charset=utf-8');  
return this._http.post(this.BaseUrl + '/api/Employee/UpdateOldEmployeeLoan',params,{headers:header})
}

RemoveOldEmployeeLoan(params:EmployeeLoan){
let header = new HttpHeaders();
header.append('Content-Type','application/json; charset=utf-8');  
return this._http.post(this.BaseUrl + '/api/Employee/RemoveOldEmployeeLoan',params,{headers:header})
}

//END Employee loan


//CRUD For Employee loan history
//BEGIN Employee loan history
GetAllEmployeeloanHistory():Observable<EmployeeLoanHistory[]>{
  return this._http.get(this.BaseUrl + "/api/Employee/GetAllEmployeeloanHistory")
  .map((response:EmployeeLoanHistory[])=> <EmployeeLoanHistory[]>response)
  }
  
  AddNewEmployeeLoanHistory(params:EmployeeLoanHistory){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/Employee/AddNewEmployeeLoanHistory',params,{headers:header})
  }
  
  
  UpdateOldEmployeeLoanHistory(params:EmployeeLoanHistory){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/Employee/UpdateOldEmployeeLoanHistory',params,{headers:header})
  }
  
  RemoveOldEmployeeLoanHistory(params:EmployeeLoanHistory){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/Employee/RemoveOldEmployeeLoanHistory',params,{headers:header})
  }
  
  //END Employee Payroll


  // BEGIN Payroll Amount
  GetAllPayrollAmount():Observable<PayrollAmount[]>{
    return this._http.get(this.BaseUrl + "/api/Employee/GetAllPayrollAmount")
    .map((response:PayrollAmount[])=> <PayrollAmount[]>response)
    }
    
    AddNewPayrollAmount(params:PayrollAmount){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/AddNewPayrollAmount',params,{headers:header})
    }
    
    
    UpdateOldPayrollAmount(params:PayrollAmount){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/UpdateOldPayrollAmount',params,{headers:header})
    }
    
    RemoveOldPayrollAmount(params:PayrollAmount){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/RemoveOldPayrollAmount',params,{headers:header})
    }
    
    //END Payroll Amount


    
  // BEGIN Payroll Date
  GetAllPayrollDate():Observable<PayrollDate[]>{
    return this._http.get(this.BaseUrl + "/api/Employee/GetAllPayrollDate")
    .map((response:PayrollDate[])=> <PayrollDate[]>response)
    }
    
    AddNewPayrollDate(params:PayrollDate){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/AddNewPayrollDate',params,{headers:header})
    }
    
    
    UpdateOldPayrollDate(params:PayrollDate){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/UpdateOldPayrollDate',params,{headers:header})
    }
    
    RemoveOldPayrollDate(params:PayrollDate){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/RemoveOldPayrollDate',params,{headers:header})
    }
    
    //END Employee Payroll Amount


}