import { Component, OnInit } from '@angular/core';
import {Employee,EmployeeDocument,EmployeeData} from '../../../models/employeemodel';
import {PayrollRate, PayrollHour, PayrollAmount} from '../../../models/payrollmodel';
import {EmployeeserviceService} from '../../../service/employee.service.service';
import {PayrollService} from '../../../service/payroll.service';
import {DomSanitizer} from '@angular/platform-browser';
import {StorageService} from '../../../service/storage.service';
import { Event } from '@angular/router/src/events';
import { CollectionService } from '../../../service/collections.required';
import { Department, EmployeeCategory, EmployeeLevelOfEducation, Region, StudentClass, EmployeeType } from '../../../models/collections';
import { ExternalService } from '../../../service/external.service';


@Component({
  selector: 'app-manageemployees',
  templateUrl: './manageemployees.component.html',
  styleUrls: ['./manageemployees.component.scss']
})
export class ManageemployeesComponent implements OnInit {

  constructor(private payrollservice:PayrollService, private storageService:StorageService,
    private externalService:ExternalService,
    private employeeservice:EmployeeserviceService,private collectionservice:CollectionService,
   private sanitizer:DomSanitizer) {
     this.loadPrequisiteData();
    }


  ngOnInit() {
  }

//VARIABLES FOR Managing Employees
tabledisplaystatus:string = "";
updatedeletedisable:boolean = true;
employeeincontext:Employee = new Employee();
newemployeedocument:EmployeeDocument = new EmployeeDocument();
employeedocumentincontext:EmployeeDocument[];
allemployee:Employee[] = this.employeeservice.getAllEmployee();
department:Department[] = this.collectionservice.getAllDepartments();
employeecategory:EmployeeCategory[] = this.collectionservice.getAllEmployeeCategories();
levelofeducation:EmployeeLevelOfEducation[] = this.collectionservice.getAllEmployeeLevelsOfEducation();
region:Region[] = this.collectionservice.getAllRegions();
employeetypes:EmployeeType[] = this.collectionservice.getAllEmployeeTypes();
allstudentclass:StudentClass[] = this.collectionservice.getAllStudentClasses();
imgsrc:any;
search:any = {category:'', department: '',  name: ''}


  loadPrequisiteData(){
          if(!this.allemployee){
            this.getAllEmployeeFromDatabase();
          }

          if(!this.department){
            this.getAllDepartmentFromDatabase();
          }

          if(!this.levelofeducation){
            this.getAllEmployeelevelofeductionFromDatabase();
          }

          if(!this.employeecategory){
            this.getAllCategoryFromDatabase();      
          }
          
          if(!this.region){
            this.getAllRegionFromDatabase();
          }

          if(!this.employeetypes){
            this.getAllEmployeeTypeFromDatabase();
          }

          if(!this.allstudentclass){
            this.getStudentClassFromDatabase();
          }
    }

getAllEmployeeTypeFromDatabase(){
  this.collectionservice.GetAllEmployeeTypes()
  .subscribe((response)=>{this.employeetypes = response;},
  (err)=>{
    this.storageService.openSnackbar(err.message);
    this.externalService.logError(err)
  });
  }

getAllEmployeeFromDatabase(){
this.employeeservice.GetAllEmployee()
.subscribe((response)=>{this.allemployee=response},
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}


getStudentClassFromDatabase(){
this.collectionservice.GetAllStudentClasses()
.subscribe((response)=>this.allstudentclass = response,
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}


getAllDepartmentFromDatabase(){
this.collectionservice.GetAllDepartments()
.subscribe((response)=>this.department = response,
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}

getAllCategoryFromDatabase(){
this.collectionservice.GetAllEmployeeCategories()
.subscribe((response)=>{this.employeecategory = response;},
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}

getAllEmployeelevelofeductionFromDatabase(){
this.collectionservice.GetAllEmployeeLevelsOfEducation()
.subscribe((response)=>this.levelofeducation = response,
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}

getAllRegionFromDatabase(){
this.collectionservice.GetAllRegions()
.subscribe((response)=>this.region = response,
(err)=>{
  this.storageService.openSnackbar(err.message);
  this.externalService.logError(err)
});
}



onfile(event:any){
      if(event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.onload = (event:any) =>{
        this.employeeincontext.imagesrc =this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
      }
 }

 onfileEmployeeDocument(event){
    if(this.imgsrc){
      var wholeimage =<HTMLImageElement>document.getElementById('documentimage');
      this.newemployeedocument =  this.employeedocumentincontext.pop();
      this.newemployeedocument.documentsrc = wholeimage.src;
      this.employeedocumentincontext.push(this.newemployeedocument);
    }
    this.newemployeedocument = new EmployeeDocument();
    if(event.target.files && event.target.files[0]){
      this.newemployeedocument.details = event.target.files[0].name.substring(0,event.target.files[0].name.lastIndexOf("."));
      var reader = new FileReader();
      reader.onload = (event:any) =>{
        this.imgsrc = this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      
      }
      reader.readAsDataURL(event.target.files[0]);
      this.employeedocumentincontext.push(this.newemployeedocument);
    }    
 }

 setEmployeeImageForDatabase(){
  var wholeimage =<HTMLImageElement>document.getElementById('img');
  this.employeeincontext.imagesrc = wholeimage.src;
 }

  setAddedEmployeeDocument(){
      if(this.imgsrc){
        var wholeimage =<HTMLImageElement>document.getElementById('documentimage');
        this.newemployeedocument =  this.employeedocumentincontext.pop();
        this.newemployeedocument.documentsrc = wholeimage.src;
        this.employeedocumentincontext.push(this.newemployeedocument);
      }
    }

  saveNewEmployee(){
          this.setAddedEmployeeDocument();
          let employeedata = new EmployeeData();
          employeedata.employee = this.employeeincontext;
          employeedata.employeedocument = this.employeedocumentincontext;
          this.setEmployeeImageForDatabase();
          this.employeeservice.AddNewEmployee(employeedata)
          .subscribe(
            (response) => {this.storageService.openDialog("NEW EMPLOYEE",response.toString(),"N");
            this.allemployee.push(this.employeeincontext);
            this.clearInputFields();this.resetSearchInputFields();},
            (err)=>{
              this.storageService.openSnackbar(err.message);
              this.externalService.logError(err)
            }
          )
    }

resetSearchInputFields(){
  this.search.category = '';
  this.search.department = '';
  this.search.name = '';
}

 updateOldEmployee(){
    this.setAddedEmployeeDocument();
    let employeedata = new EmployeeData();
    employeedata.employee = this.employeeincontext;
    employeedata.employeedocument = this.employeedocumentincontext;
    this.setEmployeeImageForDatabase();
    this.employeeservice.UpdateOldEmployee(employeedata)
    .subscribe(
      (response) => {this.storageService.openDialog("UPDATED EMPLOYEE",response.toString(),"N");
      this.clearInputFields();this.resetSearchInputFields()},
      (err)=>{
        this.storageService.openSnackbar(err.message);
        this.externalService.logError(err)
      }
    )
}

  removeOldEmployee(){
        this.employeeservice.RemoveOldEmployee(this.employeeincontext)
          .subscribe(
            (response) => {this.storageService.openDialog("DELETED STUDENT",response.toString(),"N");this.clearInputFields();this.resetSearchInputFields()},
            (err)=>{
              this.storageService.openSnackbar(err.message);
              this.externalService.logError(err)
            }
          )
    }



  searchemployeeresult:Employee[];

  filterobject(){
    if(this.search.category.toString() ==="" && this.search.department.toString()==="" &&
     this.search.name.toString()===""){
      this.clearInputFields();
      return;
    }
   var re = new RegExp(this.search.name),Key;
   if(this.allemployee){
    this.searchemployeeresult =  this.allemployee.filter(e => {
         return e.categoryId.toString().includes(this.search.category)
          && e.departmentId.toString().includes(this.search.department)
          && re.test(e.firstname);
     });
   }
   if(this.searchemployeeresult[0]){
    this.tabledisplaystatus = "Loading documents...";
    this.employeeservice.GetEmployeeDocuments(this.searchemployeeresult[0].Id)
    .subscribe(
      (response) => {
        this.employeedocumentincontext = response;
      },
      (err)=>{
        this.storageService.openSnackbar(err.message);
        this.externalService.logError(err)
        this.tabledisplaystatus = "Something Went Wrong";
      },
      ()=>{
        if(this.employeedocumentincontext.length < 1){
          this.tabledisplaystatus = "No document found";
        }
      }
    )
     this.employeeincontext = this.searchemployeeresult[0];
    this.updatedeletedisable = false;
   }
   else{
     this.employeedocumentincontext = [];
     this.employeeincontext = new Employee();
     this.updatedeletedisable = true;
   }
  }

  clearInputFields(){
    this.updatedeletedisable = true;
    this.employeedocumentincontext = [];
     this.employeeincontext = new Employee();
     this.tabledisplaystatus = "";
   }

  

   removeEmployeeDocument(event,number){
      event.preventDefault();
      this.employeedocumentincontext.splice(number,1);
   }


   //END OF MANAGING EMPLOYEES


}
