import { Component, OnInit, ViewChild } from '@angular/core';
import { PayrollService } from '../../../service/payroll.service';
import { StorageService } from '../../../service/storage.service';
import { EmployeeserviceService } from '../../../service/employee.service.service';
import { CollectionService } from '../../../service/collections.required';
import { Employee } from '../../../models/employeemodel';
import { Department, EmployeeCategory } from '../../../models/collections';
import { EmployeeLoan, EmployeeLoanHistory } from '../../../models/payrollmodel';
import { ExternalService } from '../../../service/external.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import {MatPaginator,MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  constructor(private payrollservice:PayrollService, private storageService:StorageService,
    private employeeservice:EmployeeserviceService,private collectionservice:CollectionService,
    private externalService:ExternalService) {
     this.loadPrequisiteData();
    }

    unavailable='unavailable';


  ngOnInit() {
  }

//VARIABLES FOR Managing Employees
allemployee:Employee[] = this.employeeservice.getAllEmployee();
updatedeletedisable:boolean = true;
currentemployeeincontext:Employee = new Employee();
currentemployeecategoryincontext:EmployeeCategory = new EmployeeCategory();
currentemployeedepartmentincontext:Department = new Department();
department:Department[] = this.collectionservice.getAllDepartments();
employeecategory:EmployeeCategory[] = this.collectionservice.getAllEmployeeCategories();
allemployeeloan:EmployeeLoan[] = this.payrollservice.getAllEmployeeLoan();
currentemployeeloanincontext:EmployeeLoan = new EmployeeLoan();
currentemployeeloanhistoryincontext:EmployeeLoanHistory = new EmployeeLoanHistory();
allemployeeloanhistory:EmployeeLoanHistory[] = this.payrollservice.getAllEmployeeLoanHistory();
searchemployeeresult:Employee[];

//dataSource = new UserDataSource(this.payrollservice);
displayedColumns = ['employeeloan','paymentdate','amount','action'];
dataSource = new MatTableDataSource<EmployeeLoanHistory>();


@ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {  
  this.EmployeeLoanHistoryDataSource()  
  .subscribe((res)=> {this.dataSource.data = res;
    this.dataSource.paginator = this.paginator;
    })
}

EmployeeLoanHistoryDataSource():Observable<EmployeeLoanHistory[]>{
  return this.payrollservice.GetAllEmployeeloanHistory()
  .map((response:EmployeeLoanHistory[])=> <EmployeeLoanHistory[]>response)
}

//Managing Employees

searchemployee:any = {category:'',department: '', name: ''}

     loadPrequisiteData(){
          if(!this.allemployee){
            this.getAllEmployeeFromDatabase();
          }

          if(!this.department){
            this.getAllDepartmentFromDatabase();
          }

          if(!this.employeecategory){
            this.getAllCategoryFromDatabase();      
          }

          if(!this.allemployeeloan){
            this.getAllEmployeeLoanFromDatabase();      
          }

          if(!this.allemployeeloanhistory){
            this.getAllEmployeeLoanHistoryFromDatabase();      
          }
    }

    getAllEmployeeLoanFromDatabase(){
      this.payrollservice.GetAllEmployeeloan()
      .subscribe((response)=>{this.allemployeeloan = response;},
      (err)=>{this.externalService.logError(err)});
    }

    getAllEmployeeLoanHistoryFromDatabase(){
        this.payrollservice.GetAllEmployeeloanHistory()
        .subscribe((response)=>{this.allemployeeloanhistory = response;},
        (err)=>{this.externalService.logError(err)});
    }

    getAllEmployeeFromDatabase(){
      this.employeeservice.GetAllEmployee()
      .subscribe((response)=>{this.allemployee = response;},
      (err)=>{this.externalService.logError(err)});
    }


    getAllDepartmentFromDatabase(){
      this.collectionservice.GetAllDepartments()
      .subscribe((response)=>this.department = response,
      (err)=>{this.externalService.logError(err)});
    }

    getAllCategoryFromDatabase(){
      this.collectionservice.GetAllEmployeeCategories()
      .subscribe((response)=>{this.employeecategory = response;},
      (err)=>{this.externalService.logError(err)});
    }

    removeLoanHistory(user){
        this.payrollservice.RemoveOldEmployeeLoanHistory(user)
        .subscribe((response) => {this.storageService.openDialog("LOAN HISTORY",response.toString(),"N");
        let n = this.storageService.SearchIndexPosition(user.Id,this.allemployeeloanhistory);
        this.allemployeeloanhistory.splice(n,1);
       this.dataSource.data = this.allemployeeloanhistory},
        (err) =>{this.storageService.openSnackbar(err.message);
                 this.externalService.logError(err)});
    }

    makePayment(){
      if(this.currentemployeeincontext.Id){
        this.currentemployeeloanhistoryincontext.Id = this.currentemployeeincontext.Id;
        this.currentemployeeloanhistoryincontext.employeeloanId = this.currentemployeeloanincontext.Id;
        this.currentemployeeloanhistoryincontext.employeeloan.employee.firstname = 
              this.currentemployeeincontext.firstname;
        this.currentemployeeloanhistoryincontext.employeeloan.employee.lastname = 
              this.currentemployeeincontext.lastname;
        this.payrollservice.AddNewEmployeeLoanHistory(this.currentemployeeloanhistoryincontext)
        .subscribe((response) => {this.storageService.openDialog("LOAN PAYMENT",response.toString(),"N");
        this.allemployeeloanhistory.push(this.currentemployeeloanhistoryincontext);
        this.dataSource.data = this.allemployeeloanhistory;this.currentemployeeloanhistoryincontext 
        = new EmployeeLoanHistory();this.currentemployeeincontext = new Employee()},
        (err) =>{this.storageService.openSnackbar(err.message);
                 this.externalService.logError(err)});
      }
      else{
        this.storageService.openSnackbar("Employee not selected");
      }
    }


    addNewEmployeeLoan(){
      if(!this.currentemployeeincontext.Id){
        this.storageService.openSnackbar("Employee not selected");
        return;
      }
      if(this.currentemployeeloanincontext.amount.toString().length < 1){
        this.storageService.openSnackbar("Loan Amount Not Provided");
        return;
      }
      if(this.currentemployeeloanincontext.interestrate.toString().length < 1){
        this.storageService.openSnackbar("Interest Rate Not Provided");
        return;
      }
      if(this.currentemployeeloanincontext.interestamount.toString().length < 1){
        this.storageService.openSnackbar("Interest Amount Not Provided");
        return;
      }
      if(this.currentemployeeloanincontext.monthlypayment.toString().length < 1){
        this.storageService.openSnackbar("Monthly Payment Not Provided");
        return;
      }
      this.currentemployeeloanincontext.employeeId = this.currentemployeeincontext.Id;
      this.payrollservice.AddNewEmployeeLoan(this.currentemployeeloanincontext)
      .subscribe((response) => {this.storageService.openDialog("NEW LOAN",response.toString(),"N");
      this.allemployeeloan.push(this.currentemployeeloanincontext);
      this.clearInputFields(true)},
      (err) =>{this.storageService.openSnackbar(err.message);
               this.externalService.logError(err)});
    }

    updateOldEmployeeLoan(){
      if(!this.currentemployeeincontext.Id){
        this.storageService.openSnackbar("Employee not selected");
        return;
      }
      if(this.currentemployeeloanincontext.interestrate.toString().length < 1){
        this.storageService.openSnackbar("Interest Rate Not Provided");
        return;
      }
      if(this.currentemployeeloanincontext.interestamount.toString().length < 1){
        this.storageService.openSnackbar("Interest Amount Not Provided");
        return;
      }
      if(this.currentemployeeloanincontext.monthlypayment.toString().length < 1){
        this.storageService.openSnackbar("Monthly Payment Not Provided");
        return;
      }
      this.currentemployeeloanincontext.employeeId = this.currentemployeeincontext.Id;
      this.payrollservice.UpdateOldEmployeeLoan(this.currentemployeeloanincontext)
      .subscribe((response) => {this.storageService.openDialog("NEW LOAN",response.toString(),"N");
      let n = this.storageService.SearchIndexPosition(this.currentemployeeloanincontext.Id
        ,this.allemployeeloan);
      this.allemployeeloan[n] = this.currentemployeeloanincontext; this.clearInputFields(true)},
      (err) =>{this.storageService.openSnackbar(err.message);
               this.externalService.logError(err)});
    }

    calculateInterestAmount(){
      if(this.currentemployeeincontext.Id){
        if(this.currentemployeeloanincontext.amount < 1)
        {
          return;
        }
          this.currentemployeeloanincontext.interestamount = parseFloat((
              this.currentemployeeloanincontext.interestrate 
              / 100 * this.currentemployeeloanincontext.amount).toFixed(2));

      }
      else{
        this.storageService.openSnackbar("Please select an employee");
      }
    }

  

filterobjectEmployee(){
  if(this.searchemployee.category.toString() ==="" && this.searchemployee.department.toString()==="" &&
   this.searchemployee.name.toString()===""){
    this.clearInputFields(true);
    return;
  }
 var re = new RegExp(this.searchemployee.name.toLowerCase()),Key;
 if(this.allemployee){
  this.searchemployeeresult =  this.allemployee.filter(e => {
       return e.categoryId.toString().includes(this.searchemployee.category)
        && e.departmentId.toString().includes(this.searchemployee.department)
        && re.test(e.firstname.toLowerCase() + ' ' + e.lastname.toLowerCase());
   });
 }
 if(this.searchemployeeresult[0]){
   this.currentemployeeincontext = this.searchemployeeresult[0];
   let tempEmployeeloanhistory:EmployeeLoanHistory[] = null;
   tempEmployeeloanhistory = this.allemployeeloanhistory.filter(e=>{
   return re.test(e.employeeloan.employee.firstname.toLowerCase().toString())
  });

  this.dataSource.data = tempEmployeeloanhistory;
   //Searching employee category
   let categoryindex = this.storageService
   .SearchIndexPosition(this.currentemployeeincontext.categoryId,this.employeecategory);
   this.currentemployeecategoryincontext = this.employeecategory[categoryindex];

   //Searching employee department
   let departmentindex = this.storageService.SearchIndexPosition(this.currentemployeeincontext.departmentId,this.department);
   this.currentemployeedepartmentincontext = this.department[departmentindex];
   
   //Searching employee loan
   let loanindex = this.storageService
   .SearchIndexPositionInDifferentTable(this.currentemployeeincontext.Id,this.allemployeeloan);
   this.currentemployeeloanincontext= this.allemployeeloan[loanindex]; 

   //enabling the update button and deactivating the add button
   if(this.currentemployeeloanincontext){
    this.updatedeletedisable = false;
   }
   else{
     if(this.currentemployeeincontext){
      this.updatedeletedisable = true;
        this.currentemployeeloanincontext = new EmployeeLoan();
        this.dataSource.data = tempEmployeeloanhistory;
     }
     else{
    this.clearInputFields(true);
     }
   }
 }
 else{
   this.clearInputFields(true);
   
 }
}

clearInputFields(value){
  this.dataSource.data = this.allemployeeloanhistory;
  this.currentemployeeloanincontext = new EmployeeLoan();
  this.updatedeletedisable = value;
   this.currentemployeeincontext = new Employee();
   this.currentemployeecategoryincontext = new EmployeeCategory();
   this.currentemployeedepartmentincontext = new Department();
   if(value == true){
     this.clearSearch();
   }
 }

 clearSearch(){
  this.searchemployee.name = '';
  this.searchemployee.department = '';
  this.searchemployee.category = '';
}
  

}