import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StorageService } from '../storage.service';



  
@Injectable()
export class TemplateCrudService {

    //API's of EMPLOYEE_PAYROLL
    static EMPLOYEE_PAYROLL_GETALL = '/api/Employee/GetAllEmployeeForPayroll';
    static EMPLOYEE_PAYROLL_PRINT_GETALL = '/api/Employee/GetAllEmployeeForPayrollPrint';
    static EMPLOYEE_PAYROLL_ADD = '/api/Employee/AddEmployeeForPayroll';
    static EMPLOYEE_PAYROLL_PRINT_ADD = '/api/Employee/AddEmployeeForPayrollPrint';

    //END of EMPLOYEE_PAYROLL


    //API's of INCOME
  static INCOME_GETALL = '/api/Miscellaneous/GetAllIncome';
  static INCOME_ADD = '/api/Miscellaneous/AddNewIncome';
  static INCOME_UPDATE = '/api/Miscellaneous/UpdateOldIncome';
  static INCOME_REMOVE = '/api/Miscellaneous/RemoveOldIncome';
      //End of INCOME
  
      //API's of EXPENSE
  static EXPENSE_GETALL = '/api/Miscellaneous/GetAllExpense';
  static EXPENSE_ADD = '/api/Miscellaneous/AddNewExpense';
  static EXPENSE_UPDATE = '/api/Miscellaneous/UpdateOldExpense';
  static EXPENSE_REMOVE = '/api/Miscellaneous/RemoveOldExpense';
      //End of EXPENSE

      //API's of INCOME
      static ROOM_GETALL = '/api/Miscellaneous/GetAllRoom';
      static ROOM_ADD = '/api/Miscellaneous/AddNewRoom';
      static ROOM_UPDATE = '/api/Miscellaneous/UpdateOldRoom';
      static ROOM_REMOVE = '/api/Miscellaneous/RemoveOldRoom';
      //End of INCOME
  constructor(private _http: HttpClient,private storage:StorageService) {}


  BaseUrl: string = this.storage.BaseUrl;

//CRUD For Template Crud
//BEGIN Template Crud
        ReturnObject(ApiUrl:string):Observable<any[]>{
        return this._http.get(this.BaseUrl + ApiUrl)
        .map((response:any[])=> <any[]>response)
        }

        ReturnReponse(params:any,ApiUrl:string){
        let header = new HttpHeaders();
        header.append('Content-Type','application/json; charset=utf-8');  
        return this._http.post(this.BaseUrl + ApiUrl,params,{headers:header})
        }

//END Template Crud

}