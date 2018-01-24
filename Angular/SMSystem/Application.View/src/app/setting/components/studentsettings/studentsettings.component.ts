import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../service/student.service';
import { StudentClass, StudentStatus, Department} from '../../../models/collections';
import { Search, Student } from '../../../models/studentmodel';
import { CollectionService } from '../../../service/collections.required';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-studentsettings',
  templateUrl: './studentsettings.component.html',
  styleUrls: ['./studentsettings.component.scss']
})
export class StudentsettingsComponent implements OnInit {

  searchstudent = new  Search();
  currentstudentclassincontext:StudentClass = new StudentClass();
  currentdepartmentincontext:Department = new Department();
  currentstudentstatusincontext:StudentStatus = new StudentStatus();
  studentclasses:StudentClass[] = this.collectionservice.getAllStudentClasses();
  departments:Department[] = this.collectionservice.getAllDepartments();
  studentstatuses:StudentStatus[] = this.collectionservice.getAllStudentStatuses();


  constructor(private studentservice:StudentService,private collectionservice:CollectionService,
  private storageService:StorageService) { 
    this.loadPrequisiteData();
  }

  ngOnInit() {
  }


loadPrequisiteData(){  
  if(!this.studentclasses){
    this.getAllStudentClassFromDatabase();
   }

  if(!this.departments){
   this.getAllDepartmentFromDatabase();
  }


   if(!this.studentstatuses){
    this.getAllStudentstatusFromDatabase();
   }

}



getAllStudentClassFromDatabase(){
this.collectionservice.GetAllStudentClasses()
.subscribe((response)=>this.studentclasses = response,
(err)=>console.log(err.message));
}


getAllDepartmentFromDatabase(){
this.collectionservice.GetAllDepartments()
.subscribe((response)=>this.departments = response,
(err)=>console.log(err.message));
}

getAllStudentstatusFromDatabase(){
this.collectionservice.GetAllStudentClasses()
.subscribe((response)=>this.studentstatuses = response,
(err)=>console.log(err.message));
}

//BEGIN

addNewStudentStatus(){
if(!this.currentstudentstatusincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.AddNewStudentStatus(this.currentstudentstatusincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("REGION",response.toString(),"N");
  this.studentstatuses.push(this.currentstudentstatusincontext);
  this.currentstudentstatusincontext = new StudentStatus();
  },
    err => this.storageService.openSnackbar(err.message));
}

updateOldStudentStatus(){
if(!this.currentstudentstatusincontext.Id){
  this.storageService.openSnackbar("Region not selected");
  return;
}
if(!this.currentstudentstatusincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.UpdateOldStudentStatus(this.currentstudentstatusincontext)
.subscribe(
  (response) => {this.storageService.openDialog("REGION",response.toString(),"N"); 
  this.studentstatuses[this.currentstudentstatusincontext.Id - 1] = this.currentstudentstatusincontext;
  this.currentstudentstatusincontext = new StudentStatus()},
  err => this.storageService.openSnackbar(err.message));
}

removeOldStudentStatus(){
if(!this.currentstudentstatusincontext.Id){
  this.storageService.openSnackbar("Region not selected");
  return;
}
this.collectionservice.RemoveOldStudentStatus(this.currentstudentstatusincontext)
.subscribe(
  (response) => {this.storageService.openDialog("REGION",response.toString(),"N");
  this.studentstatuses.splice(this.currentstudentstatusincontext.Id - 1,1)},
  err => this.storageService.openSnackbar(err.message));
}

//END

}
