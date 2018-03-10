import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar,MatDialog} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { CollectionService } from '../../../../../../../service/collections.required';
import { ExternalService } from '../../../../../../../service/external.service';
import { StorageService } from '../../../../../../../service/storage.service';
import { Student } from '../../../../../../../models/studentmodel';
import { StudentService } from '../../../../../../../service/student.service';
import { StudentClass, Department, StudentStatus, Region } from '../../../../../../../models/collections';

@Component({
  selector: 'app-managestudents',
  templateUrl: './managestudents.component.html',
  styleUrls: ['./managestudents.component.scss']
})
export class ManagestudentsComponent implements OnInit {

  updatedeletedisable:boolean = true;
  allstudent:Student[] = this.studentService.getAllStudent();
    search:any = {studentclass:'',department: '',firstname: ''}
    
  constructor(public dialog:MatDialog,public matSnackBar:MatSnackBar,
    public studentService:StudentService,
    private storageService:StorageService,private sanitizer:DomSanitizer,
    private collectionservice:CollectionService,private externalService:ExternalService) { 
      this.loadPrequisiteData();
    }

  ngOnInit() {
  }





      //initialize variable with some data
      class:StudentClass[] = this.collectionservice.getAllStudentClasses();
      
      department:Department[] = this.collectionservice.getAllDepartments();
      
      studentstatuses:StudentStatus[] = this.collectionservice.getAllStudentStatuses();
      
      region:Region[] = this.collectionservice.getAllRegions();
      
    
    loadPrequisiteData(){
      if(!this.department){
        this.getAllDepartmentFromDatabase();
       }
  
      if(!this.class){
       this.getStudentClassFromDatabase();
      }
  
  
       if(!this.studentstatuses){
        this.getAllStudentStatusFromDatabase();
       }
       if(!this.region){
        this.getAllRegionFromDatabase();
       }
  
       if(!this.allstudent){
        this.getAllStudentFromDatabase();
       }
  
  }
  
      //Loading data from database if variable data from storage
      //has not been loaded yet
  
      getAllStudentFromDatabase(){
        this.studentService.GetAllStudent()
        .subscribe((response)=>this.allstudent = response,
        (err)=>{this.externalService.logError(err)});
      }
  
    
  
      getStudentClassFromDatabase(){
        this.collectionservice.GetAllStudentClasses()
        .subscribe((response)=>this.class = response,
        (err)=>{this.externalService.logError(err)});
      }
  
  
      getAllDepartmentFromDatabase(){
        this.collectionservice.GetAllDepartments()
        .subscribe((response)=>this.department = response,
        (err)=>{this.externalService.logError(err)});
      }
  
      getAllStudentStatusFromDatabase(){
        this.collectionservice.GetAllStudentStatuses()
        .subscribe((response)=>this.studentstatuses = response,
        (err)=>{this.externalService.logError(err)});
      }
  
      getAllRegionFromDatabase(){
        this.collectionservice.GetAllRegions()
        .subscribe((response)=>this.region = response,
        (err)=>{this.externalService.logError(err)});
      }
  
  // END OF FEES
  
  
  //BEGIN OF MANAGING Students
    
  
  student:Student = new Student();
   dialogResult = "";
   
  
      searchstudentresult:Student[];
     filterobject(){
       if(this.search.studentclass.toString() ==="" && this.search.department.toString()==="" &&
        this.search.firstname.toString()===""){
         this.clearInputFields();
         return;
       }
      var re = new RegExp(this.search.firstname),Key;
      if(this.allstudent){
       this.searchstudentresult =  this.allstudent.filter(e => {
            return e.studentclassId.toString().includes(this.search.studentclass)
             && e.departmentId.toString().includes(this.search.department)
             && re.test(e.firstname);
        });
      }
      if(this.searchstudentresult[0]){
        this.student = this.searchstudentresult[0];
       this.updatedeletedisable = false;
      }
      else{
        this.student = new Student();
        this.updatedeletedisable = true;
      }
     }
  
     onfile(event:any){
      if(event.target.files && event.target.files[0]){
       var reader = new FileReader();
       reader.onload = (event:any) =>{
         this.student.imagesrc =this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
       }
       reader.readAsDataURL(event.target.files[0]);
      }
     }
  
  
  saveStudent(){
    this.studentService.AddNewStudent(this.student)
    .subscribe(
      (response) => {this.storageService.openDialog("NEW STUDENT",response.toString(),"N");
      this.allstudent.push(this.student);this.clearInputFields()},
      (err) =>{this.storageService.openSnackbar(err.message);this.externalService.logError(err)}
    )
  }
  
  updateStudent(){
    var wholeimage =<HTMLImageElement>document.getElementById('img');
    this.student.imagesrc = wholeimage.src;
  this.studentService.UpdateStudent(this.student)
    .subscribe(
      (response) => {this.storageService.openDialog("UPDATED STUDENT",response.toString(),"N");
      this.clearInputFields()},
      (err) =>{this.storageService.openSnackbar(err.message);this.externalService.logError(err)}
    )
  }
  
  RemoveStudent(){
    this.studentService.RemoveStudent(this.student)
      .subscribe(
        (response) => {this.storageService.openDialog("DELETED STUDENT",response.toString(),"N");
        this.clearInputFields()},
        err => {this.storageService.openSnackbar(err.message);this.externalService.logError(err)}
      )
    }
  
  clearInputFields(){
    this.search.studentclass = "";
    this.search.department = "";
    this.search.firstname = "";
    this.updatedeletedisable = true;
    this.student = new Student();
  }
  
  //END Of MANAGING Students

}

