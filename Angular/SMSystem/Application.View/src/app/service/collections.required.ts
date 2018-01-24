import { Injectable, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student, Exam, Mark} from '../models/studentmodel';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import {StudentClass,Department,Region,StudentStatus,
   EmployeeCategory, EmployeeLevelOfEducation,StudentSubject, EmployeeType} from '../models/collections'
import { PayrollRate, TaxRate, SSNITRate, PayrollAllowance } from '../models/payrollmodel';
import { ExternalService } from './external.service';

@Injectable()
export class CollectionService{

  //Declaring variables for the service
  private employeecategories:EmployeeCategory[];
  private employeelevelsofeducation:EmployeeLevelOfEducation[];
  private taxrates:TaxRate[];
  private studentclasses:StudentClass[];
  private departments:Department[];
  private regions:Region[];
  private studentstatuses:StudentStatus[];
  private studentsubjects:StudentSubject[];
  private payrollallowances:PayrollAllowance[];
  private employeetypes:EmployeeType[];
  private ssnitrates:SSNITRate;
  private payrollrates:PayrollRate;

  constructor(private _http: HttpClient,private storageService:StorageService,
  private externalService:ExternalService) {
    this.loadPrerequisiteData();
   }
   
   BaseUrl:string = this.storageService.BaseUrl;

  

  //methods to retrieve variable data
  
  getAllPayrollAllowances():PayrollAllowance[]{    
    return this.payrollallowances;
  }
  
  getAllEmployeeCategories():EmployeeCategory[]{    
    return this.employeecategories;
  }

  getAllEmployeeLevelsOfEducation():EmployeeLevelOfEducation[]{
    return this.employeelevelsofeducation;
  }

  getAllPayrollRates():PayrollRate{
    return this.payrollrates;
  }

  getAllTaxRates():TaxRate[]{
    return this.taxrates;
  }

  getAllSSNITRates():SSNITRate{
    return this.ssnitrates;
  }

  getAllStudentClasses():StudentClass[]{
   return this.studentclasses;
  }

  getAllDepartments():Department[]{
    return this.departments;
  }

  getAllRegions():Region[]{
    return this.regions;
  }

  getAllStudentStatuses():StudentStatus[]{
    return this.studentstatuses;
  }

  getAllStudentSubjects():StudentSubject[]{
    return this.studentsubjects;
  }

  getAllEmployeeTypes():EmployeeType[]{
    return this.employeetypes;
  }

   //Loading required data and storing it in its variables
      private loadPrerequisiteData(){
        this.GetAllEmployeeCategories().subscribe((response)=>this.employeecategories = response,(err)=>{this.externalService.logError(err)});
        this.GetAllEmployeeLevelsOfEducation().subscribe((response)=>this.employeelevelsofeducation = response,(err)=>{this.externalService.logError(err)});
        this.GetAllPayrollRates().subscribe((response)=>{this.payrollrates = response;},(err)=>{this.externalService.logError(err)});
        this.GetAllTaxRates().subscribe((response)=>this.taxrates = response,(err)=>{this.externalService.logError(err)});
        this.GetAllSSNITRates().subscribe((response)=>{this.ssnitrates = response},(err)=>{this.externalService.logError(err)});
        this.GetAllStudentClasses().subscribe((response)=>{this.studentclasses = response},(err)=>{this.externalService.logError(err)});
        this.GetAllDepartments().subscribe((response)=>this.departments = response,(err)=>{this.externalService.logError(err)});
        this.GetAllRegions().subscribe((response)=>this.regions = response,(err)=>{this.externalService.logError(err)});
        this.GetAllStudentStatuses().subscribe((response)=>this.studentstatuses = response,(err)=>{this.externalService.logError(err)});
        this.GetAllStudentSubjects().subscribe((response)=>this.studentsubjects = response,(err)=>{this.externalService.logError(err)});
        this.GetAllPayrollAllowances().subscribe((response)=>this.payrollallowances = response,(err)=>{this.externalService.logError(err)});
        this.GetAllEmployeeTypes().subscribe((response)=>this.employeetypes = response,(err)=>{this.externalService.logError(err)});
      } 


 
//CRUD For Student Classes
 GetAllStudentClasses():Observable<StudentClass[]>{
    return this._http.get(this.BaseUrl + "/api/collections/GetAllStudentClasses")
    .map((response:StudentClass[])=> <StudentClass[]>response)
  } 

  AddNewStudentClass(params:StudentClass){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/AddNewStudentClass',params,{headers:header})
  }


  UpdateOldStudentClass(params:StudentClass){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/UpdateOldStudentClass',params,{headers:header})
  }

  RemoveOldStudentClass(params:StudentClass){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/RemoveOldStudentClass',params,{headers:header})
  }

//CRUD For Departments

 GetAllDepartments():Observable<Department[]>{
    return this._http.get(this.BaseUrl + "/api/Collections/GetAllDepartments")
    .map((response:Department[])=> <Department[]>response)
  } 


  AddNewDepartment(params:Department){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/AddNewDepartment',params,{headers:header})
  }


  UpdateOldDepartment(params:Department){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/UpdateOldDepartment',params,{headers:header})
  }

  RemoveOldDepartment(params:Department){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/RemoveOldDepartment',params,{headers:header})
  }

  //CRUD For region

 GetAllRegions():Observable<Region[]>{
    return this._http.get(this.BaseUrl + "/api/Collections/GetAllRegions")
    .map((response:Region[])=> <Region[]>response)
  }

  AddNewRegion(params:Region){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/AddNewRegion',params,{headers:header})
  }


  UpdateOldRegion(params:Region){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/UpdateOldRegion',params,{headers:header})
  }

  RemoveOldRegion(params:Region){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/RemoveOldRegion',params,{headers:header})
  }


  //CRUD For StudentStatuses
 GetAllStudentStatuses():Observable<StudentStatus[]>{
    return this._http.get(this.BaseUrl + "/api/Collections/GetAllStudentStatuses")
    .map((response:StudentStatus[])=> <StudentStatus[]>response)
  }

  AddNewStudentStatus(params:StudentStatus){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/AddNewStudentStatus',params,{headers:header})
  }


  UpdateOldStudentStatus(params:StudentStatus){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/UpdateOldStudentStatus',params,{headers:header})
  }

  RemoveOldStudentStatus(params:StudentStatus){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/collections/RemoveOldStudentStatus',params,{headers:header})
  }

  //CRUD For StudentSubject
    //BEGIN Studentsubjects
    GetAllStudentSubjects():Observable<StudentSubject[]>{
  return this._http.get(this.BaseUrl + "/api/Collections/GetAllStudentSubjects")
  .map((response:StudentSubject[])=> <StudentSubject[]>response)
}

AddNewStudentSubject(params:StudentStatus){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/collections/AddNewStudentSubject',params,{headers:header})
}


UpdateOldStudentSubject(params:StudentStatus){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/collections/UpdateOldStudentSubject',params,{headers:header})
}

RemoveOldStudentSubject(params:StudentStatus){
  let header = new HttpHeaders();
  header.append('Content-Type','application/json; charset=utf-8');  
  return this._http.post(this.BaseUrl + '/api/collections/RemoveOldStudentSubject',params,{headers:header})
}

  //END Students subjects

  
  //CRUD For Employee Categories
    //BEGIN employee categories
    GetAllEmployeeCategories():Observable<EmployeeCategory[]>{
      return this._http.get(this.BaseUrl + "/api/collections/GetAllEmployeeCategories")
      .map((response:EmployeeCategory[])=> <EmployeeCategory[]>response)
    }
    
    AddNewEmployeeCategories(params:EmployeeCategory){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/AddNewEmployeeCategories',params,{headers:header})
    }
    
    
    UpdateOldEmployeeCategory(params:EmployeeCategory){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/UpdateOldEmployeeCategory',params,{headers:header})
    }
    
    RemoveOldEmployeeCategory(params:EmployeeCategory){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/RemoveOldEmployeeCategory',params,{headers:header})
    }
    
      //END employee categories


      //CRUD For Employee level of education
    //BEGIN Employee level of education
    GetAllEmployeeLevelsOfEducation():Observable<EmployeeLevelOfEducation[]>{
      return this._http.get(this.BaseUrl + "/api/collections/GetAllEmployeeLevelsOfEducation")
      .map((response:EmployeeLevelOfEducation[])=> <EmployeeLevelOfEducation[]>response)
    }
    
    AddNewEmployeeLevelsOfEducation(params:EmployeeLevelOfEducation){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/AddNewEmployeeLevelsOfEducation',params,{headers:header})
    }
    
    
    UpdateOldEmployeeLevelsOfEducation(params:EmployeeLevelOfEducation){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/UpdateOldEmployeeLevelsOfEducation',params,{headers:header})
    }
    
    RemoveOldEmployeeLevelsOfEducation(params:EmployeeLevelOfEducation){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/RemoveOldEmployeeLevelsOfEducation',params,{headers:header})
    }
    
      //END Employee level of education


      //CRUD For payroll rates
    //BEGIN payroll rates
    GetAllPayrollRates():Observable<PayrollRate>{
      return this._http.get(this.BaseUrl + "/api/collections/GetAllPayrollRates")
      .map((response:PayrollRate)=> <PayrollRate>response)
    }
    
    AddNewPayrollRates(params:PayrollRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/AddNewPayrollRates',params,{headers:header})
    }
    
    
    SaveOldPayrollRates(params:PayrollRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/SaveOldPayrollRates',params,{headers:header})
    }
    
    RemoveOldPayrollRates(params:PayrollRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/RemoveOldPayrollRates',params,{headers:header})
    }
    
      //END Payroll Rates

      //CRUD For Tax Rates
    //BEGIN Tax Rates
    
      GetAllTaxRates():Observable<TaxRate[]>{
        return this._http.get(this.BaseUrl + "/api/collections/GetAllTaxRates")
        .map((response:TaxRate[])=> <TaxRate[]>response)
      }
    
      AddNewTaxRates(params:TaxRate){
        let header = new HttpHeaders();
        header.append('Content-Type','application/json; charset=utf-8');  
        return this._http.post(this.BaseUrl + '/api/collections/AddNewTaxRates',params,{headers:header})
      }
    
    
    UpdateOldTaxRates(params:TaxRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/UpdateOldTaxRates',params,{headers:header})
    }
    
    RemoveOldTaxRates(params:TaxRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/RemoveOldTaxRates',params,{headers:header})
    }
    
      //END Tax Rates

      //CRUD For SSNIT Rate
    //BEGIN SSNIT Rate
    GetAllSSNITRates():Observable<SSNITRate>{
      return this._http.get(this.BaseUrl + "/api/collections/GetAllSSNITRates")
      .map((response:SSNITRate)=> <SSNITRate>response)
    }
    
    SaveSSNITRate(params:SSNITRate){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/SaveSSNITRate',params,{headers:header})
    }
    
    
      //END SSNIT Rate


      //CRUD For Payroll Rates
    //BEGIN Payroll Rates
    GetAllPayrollAllowances():Observable<PayrollAllowance[]>{
      return this._http.get(this.BaseUrl + "/api/collections/GetAllPayrollAllowances")
      .map((response:PayrollAllowance[])=> <PayrollAllowance[]>response)
    }
    
    AddNewPayrollAllowances(params:PayrollAllowance){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/AddNewPayrollAllowances',params,{headers:header})
    }
    
    
    UpdateOldPayrollAllowances(params:PayrollAllowance){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/UpdateOldPayrollAllowances',params,{headers:header})
    }
    
    RemoveOldPayrollAllowances(params:PayrollAllowance){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/RemoveOldPayrollAllowances',params,{headers:header})
    }
    
      //END Payroll Rates

   //CRUD For Employee Types
    //BEGIN Employee Types
    GetAllEmployeeTypes():Observable<EmployeeType[]>{
      return this._http.get(this.BaseUrl + "/api/collections/GeAllEmployeeTypes")
      .map((response:EmployeeType[])=> <EmployeeType[]>response)
    }
    
    SaveEmployeeType(params:EmployeeType){
      let header = new HttpHeaders();
      header.append('Content-Type','application/json; charset=utf-8');  
      return this._http.post(this.BaseUrl + '/api/collections/SaveEmployeeType',params,{headers:header})
    }

       //END Employee Types

    

}
