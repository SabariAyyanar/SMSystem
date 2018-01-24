import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Register} from '../models/register';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import {Employee,EmployeeDocument,EmployeeData} from '../models/employeemodel';
import { EmployeeCategory } from '../models/collections';
import { CollectionService } from './collections.required';
import { ExternalService } from './external.service';

@Injectable()
export class EmployeeserviceService {

 
  constructor(private _http: HttpClient,private storageService:StorageService,
    private collectionservice:CollectionService,private externalService:ExternalService) {
    this.loadPrerequisiteData();
   }
   
   BaseUrl:string = this.storageService.BaseUrl;
//declaring variable to store all employees from the database
  private employees:Employee[];

  //methong to return all the employees
   getAllEmployee():Employee[]{
    return this.employees;
  }

  private loadPrerequisiteData(){
    this.GetAllEmployee().subscribe((response)=>this.employees = response,
    (err)=>{this.externalService.logError(err)});
  }



  //CRUD operations for employees
  
  GetAllEmployee():Observable<Employee[]>{
    return this._http.get(this.BaseUrl + "/api/Employee/GetAllEmployee")
    .map((response:Employee[])=> <Employee[]>response)
  } 

  GetEmployeeDocuments(params:number):Observable<EmployeeDocument[]>{
    return this._http.get(this.BaseUrl + "/api/Employee/GetEmployeeDocuments?employeeId="+params)
    .map((response:EmployeeDocument[])=> <EmployeeDocument[]>response)
  } 
 
  AddNewEmployee(params:EmployeeData){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/AddNewEmployee',params,{headers:header})
  }

  UpdateOldEmployee(params:EmployeeData){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/UpdateOldEmployee',params,{headers:header})
  }

  RemoveOldEmployee(params:Employee){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Employee/RemoveOldEmployee',params,{headers:header})
  }
}
