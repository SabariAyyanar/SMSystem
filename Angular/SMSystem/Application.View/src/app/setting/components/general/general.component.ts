import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../service/student.service';
import { StudentClass,Department, Region, EmployeeCategory, StudentSubject } from '../../../models/collections';
import { Search, Student } from '../../../models/studentmodel';
import { CollectionService } from '../../../service/collections.required';
import { StorageService } from '../../../service/storage.service';
import { SchoolInfo } from '../../../models/external';
import { ExternalService } from '../../../service/external.service';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  searchstudent = new  Search();
  currentschoolinfoincontext:SchoolInfo = this.externalService.getSchoolInfo();
  currentstudentclassincontext:StudentClass = new StudentClass();
  currentstudentsubjectincontext:StudentSubject = new StudentSubject();
  currentdepartmentincontext:Department = new Department();
  currentregionincontext:Region = new Region();
  studentclasses:StudentClass[] = this.collectionservice.getAllStudentClasses();
  departments:Department[] = this.collectionservice.getAllDepartments();
  regions:Region[] = this.collectionservice.getAllRegions();
  studentsubjects:StudentSubject[] = this.collectionservice.getAllStudentSubjects();
  filterstudentsubjects:StudentSubject[];

  constructor(private studentservice:StudentService,private collectionservice:CollectionService,
  private storageService:StorageService,private externalService:ExternalService,
    private loaderService:LoaderService) { 
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

  if(!this.regions){
    this.getAllRegionFromDatabase();
   }

   if(!this.studentsubjects){
    this.getAllStudentSubjectFromDatabase();
   }

   if(!this.currentschoolinfoincontext){
    this.getSchoolDataFromDatabase();
   }

}


//Loading data from database
  //BEGIN
getAllStudentClassFromDatabase(){
  this.loaderService.displayLoading();
this.collectionservice.GetAllStudentClasses()
.subscribe((response)=>{
  this.studentclasses = response
  this.loaderService.dismissLoading();
},
(err)=>{  
  this.externalService.logError(err);
  this.loaderService.dismissLoading();
});
}


getAllDepartmentFromDatabase(){
  this.loaderService.displayLoading();
this.collectionservice.GetAllDepartments()
.subscribe((response)=>{
  this.departments = response;
  this.loaderService.dismissLoading();
},
(err)=>{  
  this.externalService.logError(err);
  this.loaderService.dismissLoading();
});
}

  getAllRegionFromDatabase(){
    this.loaderService.displayLoading();
  this.collectionservice.GetAllRegions()
  .subscribe((response)=>{
    this.regions = response;
    this.loaderService.dismissLoading();
  },
  (err)=>{    
    this.externalService.logError(err);
    this.loaderService.dismissLoading();
  }
  );
  }

  getAllStudentSubjectFromDatabase(){
    this.loaderService.displayLoading();
    this.collectionservice.GetAllStudentSubjects()
    .subscribe((response)=>{
      this.loaderService.dismissLoading();
      this.studentsubjects = response
    },
    (err)=>{
      this.externalService.logError(err);
      this.loaderService.dismissLoading();
    });
    }

  getSchoolDataFromDatabase(){
    this.loaderService.displayLoading();
    this.externalService.ReadSchoolData()
    .subscribe((response)=>{
      this.currentschoolinfoincontext = response;
      this.loaderService.dismissLoading();
    },
    (err)=> {
      this.externalService.logError(err);
      this.loaderService.dismissLoading();
    });
    }
    //END

  //CRUD methods for school info
  saveSchoolInfo(){
      this.externalService.SaveSchoolData(this.currentschoolinfoincontext)
      .subscribe((res)=> this.storageService.openDialog("SCHOOL DATA",res,"N"),
        (err) => this.externalService.logError(err));
  }


//CRUD methods for student class
addNewStudentClass(){
if(!this.currentstudentclassincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.AddNewStudentClass(this.currentstudentclassincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("CLASS",response.toString(),"N");
    this.studentclasses.push(this.currentstudentclassincontext);
   this.currentstudentclassincontext = new StudentClass();
  },
    err => this.storageService.openSnackbar(err.message));
}

updateOldStudentClass(){
if(!this.currentstudentclassincontext.Id){
  this.storageService.openSnackbar("Class not selected");
  return;
}
if(!this.currentstudentclassincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
let temporarystudentclass = this.studentclasses[this.currentstudentclassincontext.Id - 1];
temporarystudentclass.name = this.currentstudentclassincontext.name;
this.collectionservice.UpdateOldStudentClass(temporarystudentclass)
.subscribe(
  (response) => {this.storageService.openDialog("CLASS",response.toString(),"N"); 
  this.studentclasses[this.currentstudentclassincontext.Id - 1] = temporarystudentclass;
  this.currentstudentclassincontext = new StudentClass();},
  err => this.storageService.openSnackbar(err.message));
}

removeOldStudentClass(){
if(!this.currentstudentclassincontext.Id){
  this.storageService.openSnackbar("Class not selected");
  return;
}
this.collectionservice.RemoveOldStudentClass(this.currentstudentclassincontext)
.subscribe(
  (response) => {this.storageService.openDialog("CLASS",response.toString(),"N");
  this.studentclasses.splice(this.currentstudentclassincontext.Id - 1,1)},
  err => this.storageService.openSnackbar(err.message));
}

//END CRUD methods for students class




//CRUD methods for Departments
//BEGIN

addNewDepartment(){
if(!this.currentdepartmentincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.AddNewDepartment(this.currentdepartmentincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("DEPARTMENT",response.toString(),"N");
  this.departments.push(this.currentdepartmentincontext);
  this.currentdepartmentincontext = new Department();
  },
    err => this.storageService.openSnackbar(err.message));
}

updateOldDepartment(){
if(!this.currentdepartmentincontext.Id){
  this.storageService.openSnackbar("Department not selected");
  return;
}
if(!this.currentdepartmentincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
let temporarydepartment = this.departments[this.currentdepartmentincontext.Id - 1];
temporarydepartment.name = this.currentdepartmentincontext.name;
this.collectionservice.UpdateOldDepartment(temporarydepartment)
.subscribe(
  (response) => {this.storageService.openDialog("DEPARTMENT",response.toString(),"N"); 
  this.departments[this.currentdepartmentincontext.Id - 1] = temporarydepartment;
  this.currentdepartmentincontext = new Department();},
  err => this.storageService.openSnackbar(err.message));
}

removeOldDepartment(){
if(!this.currentdepartmentincontext.Id){
  this.storageService.openSnackbar("Department not selected");
  return;
}
this.collectionservice.RemoveOldDepartment(this.currentdepartmentincontext)
.subscribe(
  (response) => {this.storageService.openDialog("DEPARTMENT",response.toString(),"N");
  this.departments.splice(this.currentdepartmentincontext.Id - 1,1)},
  err => this.storageService.openSnackbar(err.message));
}

//END departments

//CRUD methods for region
//BEGIN

addNewRegion(){
if(!this.currentregionincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.AddNewRegion(this.currentregionincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("REGION",response.toString(),"N");
  this.regions.push(this.currentregionincontext);
  this.currentregionincontext = new Region();
  },
    err => this.storageService.openSnackbar(err.message));
}

updateOldRegion(){
if(!this.currentregionincontext.Id){
  this.storageService.openSnackbar("Region not selected");
  return;
}
if(!this.currentregionincontext.name){
  this.storageService.openSnackbar("New Name cannot be empty");
  return;
}
this.collectionservice.UpdateOldRegion(this.currentregionincontext)
.subscribe(
  (response) => {this.storageService.openDialog("REGION",response.toString(),"N"); 
  this.regions[this.currentregionincontext.Id - 1] = this.currentregionincontext;
  this.currentregionincontext = new Region()},
  err => this.storageService.openSnackbar(err.message));
}

removeOldRegion(){
if(!this.currentregionincontext.Id){
  this.storageService.openSnackbar("Region not selected");
  return;
}
this.collectionservice.RemoveOldRegion(this.currentregionincontext)
.subscribe(
  (response) => {this.storageService.openDialog("REGION",response.toString(),"N");
  this.regions.splice(this.currentregionincontext.Id - 1,1)},
  err => this.storageService.openSnackbar(err.message));
}
//END

//CRUD methods for student subjects
//BEGIN student subjects

filterStudentSubject(){
this.currentstudentsubjectincontext.Id = null;
 let search:string = this.currentstudentsubjectincontext.studentclassid.toString();
  if(search == ""){
   return;
 }
if(this.studentsubjects){
 this.filterstudentsubjects = this.studentsubjects.filter(e => {
      return e.studentclassid.toString().includes(search)
  });
  }
}

addNewSubject(){
  if(!this.currentstudentsubjectincontext.studentclassid){
    this.storageService.openSnackbar("Class not selected");
    return;
  }
  if(!this.currentstudentsubjectincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  this.collectionservice.AddNewStudentSubject(this.currentstudentsubjectincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("SUBJECT",response.toString(),"N");
    this.studentsubjects.push(this.currentstudentsubjectincontext);
    this.currentstudentsubjectincontext = new StudentSubject();
    },
      err => this.storageService.openSnackbar(err.message));
  }
  
  updateOldSubject(){
  if(!this.currentstudentsubjectincontext.Id){
    this.storageService.openSnackbar("Subject not selected");
    return;
  }
  if(!this.currentstudentsubjectincontext.name || this.currentstudentsubjectincontext.name.trim().length < 1){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  this.collectionservice.UpdateOldStudentSubject(this.currentstudentsubjectincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("SUBJECT",response.toString(),"N"); 
    this.studentsubjects[this.currentstudentsubjectincontext.Id - 1] = this.currentstudentsubjectincontext;
    this.currentstudentsubjectincontext = new StudentSubject()},
    err => this.storageService.openSnackbar(err.message));
  }
  
  removeOldSubject(){
  if(!this.currentstudentsubjectincontext.Id){
    this.storageService.openSnackbar("Subject not selected");
    return;
  }
  this.collectionservice.RemoveOldStudentSubject(this.currentregionincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("SUBJECT",response.toString(),"N");
    this.studentsubjects.splice(this.currentstudentsubjectincontext.Id - 1,1)},
    err => this.storageService.openSnackbar(err.message));
  }
  //END student subjects

}
