import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../service/collections.required';
import { LoaderService } from '../../../service/loader.service';
import { EmployeeCategory, EmployeeLevelOfEducation, EmployeeType } from '../../../models/collections';
import { ExternalService } from '../../../service/external.service';
import { ViewChild } from '@angular/core';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  currentemployeecategoryincontext:EmployeeCategory = new EmployeeCategory();
  currentemployeetypeincontext:EmployeeType = new EmployeeType();
  currentemployeelevelsofeducationincontext:EmployeeLevelOfEducation = new EmployeeLevelOfEducation();
  constructor(private collectionService:CollectionService,private loaderService:LoaderService,
              private externalService:ExternalService,private storageService:StorageService) { 
                this.loadPrequisiteData();
              }

  allemployeecategories: EmployeeCategory[] = this.collectionService.getAllEmployeeCategories();
  allemployeelevelsofeducations: EmployeeLevelOfEducation[] = this.collectionService.getAllEmployeeLevelsOfEducation();
  allemployeetypes:EmployeeType[] = this.collectionService.getAllEmployeeTypes();
 
  
  ngOnInit() {
    this.loaderService.displayLoading();

  }


  ngAfterContentInit(){        
    this.loaderService.dismissLoading();
      }


loadPrequisiteData(){  
  if(!this.allemployeecategories){
    this.getAllEmployeeCategoryFromDatabase();
   }

  if(!this.allemployeelevelsofeducations){
   this.getAllEmployeeLevelsOfEducationFromDatabase();
  }

  if(!this.allemployeetypes){
   this.getAllEmployeeTyepFromDatabase();
  }

}


  //Loading data from database
    //BEGIN

    getAllEmployeeTyepFromDatabase(){
      this.loaderService.displayLoading();
    this.collectionService.GetAllEmployeeTypes()
    .subscribe((response)=>{    
      this.allemployeetypes = response;
      this.loaderService.dismissLoading()}
      ,
    (err)=>{
      this.loaderService.dismissLoading();
      this.externalService.logError(err)
    });
    }
  
  getAllEmployeeCategoryFromDatabase(){
    this.loaderService.displayLoading();
  this.collectionService.GetAllEmployeeCategories()
  .subscribe((response)=>{    
    this.allemployeecategories = response;
    this.loaderService.dismissLoading()}
    ,
  (err)=>{
    this.loaderService.dismissLoading();
    this.externalService.logError(err)
  });
  }


  getAllEmployeeLevelsOfEducationFromDatabase(){
    this.loaderService.dismissLoading();
  this.collectionService.GetAllEmployeeLevelsOfEducation()
  .subscribe((response)=>{
    this.allemployeelevelsofeducations = response;
    this.loaderService.dismissLoading();},
  (err)=>{this.externalService.logError(err)
        this.loaderService.dismissLoading();
  });
  }

  //setting the allowance percent of the selected employee category
  displayOldAllowancePercent(){
    let num = this.storageService
    .SearchIndexPosition(this.currentemployeecategoryincontext.Id,this.allemployeecategories);
    this.currentemployeecategoryincontext.allowancepercentage =  this.allemployeecategories[num].allowancepercentage; 
  }

//CRUD For entities addition , update and removal
addNewEmployeeCategory(){

  if(!this.currentemployeecategoryincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  if(!this.currentemployeecategoryincontext.allowancepercentage){
    this.storageService.openSnackbar("Allowance percentage cannot be empty");
    return;
  }
  this.collectionService.AddNewEmployeeCategories(this.currentemployeecategoryincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("EMPLOYEE CATEGORY",response.toString(),"N");
    this.allemployeecategories.push(this.currentemployeecategoryincontext);
    this.currentemployeecategoryincontext = new EmployeeCategory();
    },
      err => {this.storageService.openSnackbar(err.message)
              this.externalService.logError(err)});
}

updateOldEmployeeCategory(){
  if(!this.currentemployeecategoryincontext.Id){
    this.storageService.openSnackbar("Employee Category not selected");
    return;
  }
  if(!this.currentemployeecategoryincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  if(!this.currentemployeecategoryincontext.allowancepercentage){
    this.storageService.openSnackbar("Allowance percentage cannot be empty");
    return;
  }
  this.collectionService.UpdateOldEmployeeCategory(this.currentemployeecategoryincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("EMPLOYEE CATEGORY",response.toString(),"N"); 
    let num = this.storageService.SearchIndexPosition(this.currentemployeecategoryincontext.Id,this.allemployeecategories);
    this.allemployeecategories[num] 
    = this.currentemployeecategoryincontext;
    this.currentemployeecategoryincontext = new EmployeeCategory()},
    err => {this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}

removeOldEmployeeCategory(){
  if(!this.currentemployeecategoryincontext.Id){
    this.storageService.openSnackbar("Employee Category not selected");
    return;
  }
  this.collectionService.RemoveOldEmployeeCategory(this.currentemployeecategoryincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("EMPLOYEE CATEGORY",response.toString(),"N");
    let num = this.storageService.SearchIndexPosition(this.currentemployeecategoryincontext.Id,this.allemployeecategories);
    this.allemployeecategories.splice(num,1)},
    err => {this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}

addNewEmployeeLevelOfEducation(){
  if(!this.currentemployeelevelsofeducationincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  this.collectionService.AddNewEmployeeLevelsOfEducation(this.currentemployeelevelsofeducationincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("EMPLOYEE LEVEL OF EDUCATION",response.toString(),"N");
    this.allemployeelevelsofeducations.push(this.currentemployeelevelsofeducationincontext);
    this.currentemployeelevelsofeducationincontext = new EmployeeLevelOfEducation();
    },
      err => {this.storageService.openSnackbar(err.message)
              this.externalService.logError(err)});
}

updateOldEmployeeLevelOfEducation(){
  if(!this.currentemployeelevelsofeducationincontext.Id){
    this.storageService.openSnackbar("Employee Level Of Education not selected");
    return;
  }
  if(!this.currentemployeelevelsofeducationincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  this.collectionService
  .UpdateOldEmployeeLevelsOfEducation(this.currentemployeelevelsofeducationincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("EMPLOYEE LEVEL OF EDUCATION",response.toString(),"N"); 
    let num = this.storageService
    .SearchIndexPosition(this.currentemployeelevelsofeducationincontext.Id
      ,this.allemployeelevelsofeducations);
    this.allemployeelevelsofeducations[num] 
    = this.currentemployeelevelsofeducationincontext;
    this.currentemployeelevelsofeducationincontext = new EmployeeLevelOfEducation()},
    err => {this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}

removeOldEmployeeLevelOfEducation(){
  if(!this.currentemployeelevelsofeducationincontext.Id){
    this.storageService.openSnackbar("Employee Level Of Education not selected");
    return;
  }
  this.collectionService.RemoveOldEmployeeLevelsOfEducation(this.currentemployeelevelsofeducationincontext)
  .subscribe(
    (response) => {this.storageService.openDialog("EMPLOYEE LEVEL OF EDUCATION",response.toString(),"N");
    let num = this.storageService
        .SearchIndexPosition(this.currentemployeelevelsofeducationincontext.Id,this.allemployeelevelsofeducations);
    this.allemployeelevelsofeducations.splice(num,1)},
    err => {this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}

renameEmployeeType(){
  if(!this.currentemployeetypeincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  this.collectionService.SaveEmployeeType(this.currentemployeetypeincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("EMPLOYEE TYPE",response.toString(),"N");
      let num = this.storageService.SearchIndexPosition(this.currentemployeetypeincontext.Id,this.allemployeetypes)
    this.allemployeetypes[num] = this.currentemployeetypeincontext;
    },
      err => {this.storageService.openSnackbar(err.message)
              this.externalService.logError(err)});
}
}
