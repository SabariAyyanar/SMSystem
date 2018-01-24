import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student, Exam, Mark} from '../models/studentmodel';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import {StudentClass,Department,Region,StudentStatus} from '../models/collections'
import { ExternalService } from './external.service';

@Injectable()
export class StudentService {

 
  constructor(private _http: HttpClient,private storageService:StorageService,
  private externalService:ExternalService) {
    this.loadPrerequisiteData();
   }
   
   BaseUrl:string = this.storageService.BaseUrl;
   private students:Student[];
   private exams:Exam[];
   private allmarks:Mark[];

   getAllMarks():Mark[]{    
    return this.allmarks;
  }

   getAllStudent():Student[]{
    return this.students;
  }

  getAllExam():Exam[]{
    return this.exams;
  }
   

  private loadPrerequisiteData(){
    this.GetAllStudent().subscribe((response)=>this.students = response,
    (err)=>{this.externalService.logError(err)})

    this.GetAllExam().subscribe((response)=>this.exams = response,
    (err)=>{this.externalService.logError(err)})
  }

  

  GetAllExam():Observable<Exam[]>{
    return this._http.get(this.BaseUrl + "/api/Student/GetAllExam")
    .map((response:Exam[])=> <Exam[]>response)
  }

  GetAllStudent():Observable<Student[]>{
    return this._http.get(this.BaseUrl + "/api/Student/GetAllStudent")
    .map((response:Student[])=> <Student[]>response)
  }


  //CRUD Operation for students
  AddNewStudent(params:Student){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/AddStudent',params,{headers:header})
          .map((response:Student[])=> <Student[]>response)
  }

  UpdateStudent(params:Student){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/UpdateStudent',params,{headers:header})
    .map((response:Student[])=> <Student[]>response)
  } 

  RemoveStudent(params:Student){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/RemoveStudent',params,{headers:header})
  } 


  //CRUD Operation for students

  PrintExam(params:Exam){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/PrintExam',{headers:header})
  }

  AddExam(params:Exam){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/AddExam',params,{headers:header})
  }

  UpdateExam(params:Exam){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/UpdateExam',params,{headers:header})
  } 

  RemoveExam(params:Exam){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Student/RemoveExam',params,{headers:header})
  }
}
