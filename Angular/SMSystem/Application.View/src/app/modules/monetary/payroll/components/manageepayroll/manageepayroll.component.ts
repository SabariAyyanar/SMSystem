import { Component, OnInit,Input,OnChanges,SimpleChange,ChangeDetectorRef } from '@angular/core';
import {Employee} from '../../../../../models/employeemodel';
import {PayrollRate, PayrollHour, PayrollAmount, PayrollAllowance,
   SSNITRate, TaxRate, PayrollDate} from '../../../../../models/payrollmodel';
import {PayrollService} from '../../../../../service/payroll.service';
import {DomSanitizer} from '@angular/platform-browser';
import {StorageService} from '../../../../../service/storage.service';
import { Event } from '@angular/router/src/events';
import { CollectionService } from '../../../../../service/collections.required';
import { Department, EmployeeCategory } from '../../../../../models/collections';
import { ExternalService } from '../../../../../service/external.service';
import { LoaderService } from '../../../../../service/loader.service';
import { PageChangeEvent, DataStateChangeEvent } 
from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { State,process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { window } from 'rxjs/operators/window';
import { TemplateEditService } 
from '../../../../../service/BehaviorialService/templatebehavourial.service';
import { EmployeeserviceService } from '../../../../../service/employee.service.service';
import { TemplateCrudService } from '../../../../../service/BehaviorialService/template.service';


@Component({
  selector: 'app-manageepayroll',
  templateUrl: './manageepayroll.component.html',
  styleUrls: ['./manageepayroll.component.scss']
})
export class ManageepayrollComponent implements OnInit { 
  
  payrollrate:PayrollRate =  new PayrollRate();
  invisiblepayrollrate:PayrollRate = this.collectionservice.getAllPayrollRates();
  payrollallowance:PayrollAllowance[] = this.collectionservice.getAllPayrollAllowances();
  payrollhour = new PayrollHour();
  payrollamount = new PayrollAmount();
  deductLoan:boolean = false;
  allpayrolldate:PayrollDate[] = this.payrollservice.getAllPayrollDate();
  
  //VARIABLES FOR Managing Employees
  currentemployeeincontext:Employee = new Employee();
  allemployee:Employee[] = this.employeeservice.getAllEmployee();
  department:Department[] = this.collectionservice.getAllDepartments();
  employeecategory:EmployeeCategory[] = this.collectionservice.getAllEmployeeCategories();
  ssnitrate:SSNITRate = this.collectionservice.getAllSSNITRates();
  taxrates:TaxRate[] = this.collectionservice.getAllTaxRates();

  constructor(private payrollservice:PayrollService, private storageService:StorageService,
    private employeeservice:EmployeeserviceService,private collectionservice:CollectionService,
    private sanitizer:DomSanitizer,private externalService:ExternalService,
    private loaderService:LoaderService,private cdr:ChangeDetectorRef,
    private templateEditService:TemplateEditService) {
     this.loadPrequisiteData();
     this.payrollamount.expectedworkhours = 0;
    }

    ngOnInit() {
      this.view = this.templateEditService.map(data => process(data, this.gridState));    
      this.templateEditService.read(TemplateCrudService.EMPLOYEE_PAYROLL_GETALL);
    }
    interval;
    setPayrollDateAndNumber(){
      let payrolldate = this.allpayrolldate.pop();
      this.payrollamount.totalworkdays = 0;
      if(payrolldate){
          this.payrollamount.totalworkdays = payrolldate.numberofdays;
          this.payrollamount.startdate = payrolldate.startdate;
          this.payrollamount.enddate = payrolldate.enddate;
      }
      else{
       this.interval =  setInterval(()=>{
           this.getAllPayrollDates();
            this.storageService
            .openSnackbarForSuccessTopLeft("Payroll Month not set")},10000)
      }      
    this.calculateExpectedWorkHours();
    }


    //KENDDO GRID ------------------


  private gridView: GridDataResult;
  
  
      public position: 'top' | 'bottom' | 'both' = 'top';
      public onStateChange(state: DataStateChangeEvent) {
        this.gridState = state;      
        this.templateEditService.read(TemplateCrudService.EMPLOYEE_PAYROLL_GETALL);
    }
  
    public view: Observable<GridDataResult>;
  
    // grid variables
    public gridState: State = {
      sort: [],
      skip: 0,
      take: 10,
  
      filter: {
          logic: 'and',
          filters: [{ field:
            'fullname',operator: 'contains',
           value:'' }]
        }
  };
    //KENDO GRID ----------------


//VARIABLES FOR Managing payroll




   //Loading Prerequisite Data to be stored in variables


    loadPrequisiteData(){
            if(!this.payrollallowance){
              this.getAllPayrollAllowanceFromDatabase();
            }

            if(!this.allpayrolldate){
              this.getAllPayrollDates();
            }
            else{
              this.setPayrollDateAndNumber();
            }

            if(!this.allemployee){
              this.getAllEmployeeFromDatabase();
            }
          
            if(!this.invisiblepayrollrate){
            this.getAllPayrollRateFromDatabase();
            }
          
            if(!this.department){
              this.getAllDepartmentFromDatabase();
            }
          
            if(!this.employeecategory){
              this.getAllCategoryFromDatabase();      
            }

            if(!this.ssnitrate){
              this.getAllSSNITRateFromDatabase();      
            }

            if(!this.taxrates){
              this.getAllTaxRateFromDatabase();      
            }
          
      }
calculateRatesForOvertime(){
  this.payrollrate.workdayovertime = this.calculatePayrollRate(this.invisiblepayrollrate.workdayovertime);
  
       this.payrollrate.saturday = this.calculatePayrollRate(this.invisiblepayrollrate.saturday);
  
       this.payrollrate.saturdayovertime = this.calculatePayrollRate(this.invisiblepayrollrate.saturdayovertime);
  
       this.payrollrate.sunday = this.calculatePayrollRate(this.invisiblepayrollrate.sunday);
  
       this.payrollrate.sundayovertime = this.calculatePayrollRate(this.invisiblepayrollrate.sundayovertime);
  
       this.payrollrate.holiday = this.calculatePayrollRate(this.invisiblepayrollrate.holiday);
  
       this.payrollrate.holidayovertime = this.calculatePayrollRate(this.invisiblepayrollrate.holidayovertime);
}

  setEmployeeInContext({sender, rowIndex, dataItem}){
    this.currentemployeeincontext = dataItem;
    this.payrollamount.employeeId = dataItem.Id;
    this.ClearPayrollAmount();
    this.calculateWorkDayRate();
    this.calculateRatesForOvertime();
    this.calculateExpectedWorkHours();
    this.calculateAllowance();
  }

  calculateWorkDayRate(){
    this.payrollrate.workday = this.roundToTwoDecimalPlaces(this.currentemployeeincontext.salary / (
     this.currentemployeeincontext.workinghours * this.payrollamount.totalworkdays
    ));
  }

  roundToTwoDecimalPlaces(value:number):number{
    return parseFloat(Math.round(value).toFixed(2));
}

calculatePayrollRate(percent:number):number{
  return this.roundToTwoDecimalPlaces(this.payrollrate.workday * (percent/100));
}

  

  calculateExpectedWorkHours(){
    this.payrollamount.expectedworkhours =this.roundToTwoDecimalPlaces(this.currentemployeeincontext.workinghours 
    * this.payrollamount.totalworkdays);

    if(isNaN(this.payrollamount.expectedworkhours)){
      this.payrollamount.expectedworkhours = 0;
    }
  }


  calculateGrossSalary(){
    this.payrollamount.grosssalary = this.roundToTwoDecimalPlaces(
        this.payrollamount.workday + this.payrollamount.workdayovertime + 
        this.payrollamount.saturday + this.payrollamount.saturdayovertime + 
        this.payrollamount.sunday + this.payrollamount.sundayovertime + 
        this.payrollamount.holiday + this.payrollamount.holidayovertime);
        this.calculateExpectedWorkHours();
        this.calculateSSNITAmount();
        this.calculateTaxAmount();
        this.calculateAllowance();
        this.calculateNetSalary();
    }

  calculateNetSalary(){
    if(this.deductLoan){
    this.payrollamount.netsalary = this.payrollamount.grosssalary -
                                  this.payrollamount.payee - 
                                  this.payrollamount.ssnit - 
                                  this.payrollamount.loan  -  
                                  this.payrollamount.totalallowance;
    }
    else{
    this.payrollamount.netsalary = this.payrollamount.grosssalary -
                                  this.payrollamount.payee - 
                                  this.payrollamount.ssnit +
                                  this.payrollamount.totalallowance;
        }
      }

  calculateTaxAmount(){
    var currentnetamount = this.payrollamount.grosssalary - this.payrollamount.ssnit;
    var taxamount = 0;
    for(var key in this.taxrates){
      if(parseInt(key) == this.taxrates.length - 1){
        if(currentnetamount < this.taxrates[key].amount){
          return;
        }
        taxamount = taxamount + this.taxrates[key].rate / 100 * currentnetamount;
      }
      else{
      if(currentnetamount < this.taxrates[key].amount){
        return;
      }
      taxamount = taxamount +   this.taxrates[key].rate / 100 * this.taxrates[key].amount;
      currentnetamount = currentnetamount - this.taxrates[key].amount;
      }
      }
      this.payrollamount.payee = this.roundToTwoDecimalPlaces(taxamount);
    }



  calculateSSNITAmount(){
    this.payrollamount.ssnit = 
    this.roundToTwoDecimalPlaces(this.ssnitrate.Rate/100 *  this.payrollamount.grosssalary);
    }

  calculateLoamAmount(){
    
  }

  calculateAllowance(){
    var i = 0;
    var totalamount = 0;
    for(var key in this.payrollallowance){
     var amount =  this.payrollallowance[key].amount;
     var n = this.storageService.SearchIndexPosition(this.currentemployeeincontext.categoryId,
        this.employeecategory);
      var percent =  this.employeecategory[n].allowancepercentage;
      this.payrollamount.allowances[i].payrollallowanceId = this.payrollallowance[key].Id;
      this.payrollamount.allowances[i] = new PayrollAllowance();
      this.payrollamount.allowances[i].amount = percent/100 * amount;
      totalamount = this.payrollamount.allowances[i].amount;
      i++;
    }
    this.payrollamount.totalallowance = this.roundToTwoDecimalPlaces(totalamount);
  }

  

  //Getting data from database when variables are null

        getAllPayrollAllowanceFromDatabase(){
            this.collectionservice.GetAllPayrollAllowances()
            .subscribe((response)=>{this.payrollallowance = response;},
            (err)=>{
              this.storageService.openSnackbar(err.message);
              this.externalService.logError(err)
            });
          }

          getAllPayrollDates(){
            this.payrollservice.GetAllPayrollDate()
            .subscribe((response)=>{this.allpayrolldate = response;this.setPayrollDateAndNumber();},
            (err)=>{
              this.storageService.openSnackbar(err.message);
              this.externalService.logError(err)
            });
          }


       getAllEmployeeFromDatabase(){
          this.employeeservice.GetAllEmployee()
          .subscribe((response)=>{this.allemployee = response;},
          (err)=>{
            this.storageService.openSnackbar(err.message);
            this.externalService.logError(err)
          });
      }
  
      getAllPayrollRateFromDatabase(){
          this.collectionservice.GetAllPayrollRates()
          .subscribe((response)=>{ 
            this.invisiblepayrollrate = response == null? new PayrollRate():response},
          (err)=>{
            this.storageService.openSnackbar(err.message);
            this.externalService.logError(err)
          });
      }
  
        getAllDepartmentFromDatabase(){
            this.collectionservice.GetAllDepartments()
            .subscribe((response)=>{this.department = response},
            (err)=>{
              this.storageService.openSnackbar(err.message);
              this.externalService.logError(err)
            },
            () => this.loaderService.dismissLoading());
        }
  
        getAllCategoryFromDatabase(){
          this.collectionservice.GetAllEmployeeCategories()
          .subscribe((response)=>{this.employeecategory = response;},
          (err)=>{
            this.storageService.openSnackbar(err.message);
            this.externalService.logError(err)
          },
          () => this.loaderService.dismissLoading())
        }

        getAllSSNITRateFromDatabase(){
          this.collectionservice.GetAllSSNITRates()
          .subscribe((response)=>{this.ssnitrate = response;},
          (err)=>{
            this.storageService.openSnackbar(err.message);
            this.externalService.logError(err)
          },
          () => this.loaderService.dismissLoading())
        }

        getAllTaxRateFromDatabase(){
          this.collectionservice.GetAllTaxRates()
          .subscribe((response)=>{this.taxrates = response;},
          (err)=>{
            this.storageService.openSnackbar(err.message);
            this.externalService.logError(err)
          },
          () => this.loaderService.dismissLoading())
        }

        checkIfEmployeIsSet():boolean{
          if(this.currentemployeeincontext.Id && 
            this.currentemployeeincontext.salary){
            this.calculateWorkDayRate();
            return true;
          }
          else{
            if(this.allemployee.length > 0){
              this.currentemployeeincontext = this.allemployee[0];
              this.calculateWorkDayRate();
              return true;
            }
            else{
              return false;
            }
          }
        }

      //End of getting data from database when variables are null

    //End of Loading Prerequiste Data
  

//BEGINNING OF PAYROLL

    computeworkday(){
      this.payrollamount.workday = this.payrollrate.workday * this.payrollhour.workday;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computeworkdayovertime(){
      this.payrollamount.workdayovertime = this.payrollrate.workdayovertime * this.payrollhour.workdayovertime;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computesaturday(){
      this.payrollamount.saturday = this.payrollrate.saturday * this.payrollhour.saturday;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computesaturdayovertime(){
      this.payrollamount.saturdayovertime = this.payrollrate.saturdayovertime * this.payrollhour.saturdayovertime;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computesunday(){
      this.payrollamount.sunday = this.payrollrate.sunday * this.payrollhour.sunday;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computesundayovertime(){
      this.payrollamount.sundayovertime = this.payrollrate.sundayovertime * this.payrollhour.sundayovertime;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computeholiday(){
      this.payrollamount.holiday = this.payrollrate.holiday * this.payrollhour.holiday;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

    computeholidayovertime(){        
      this.payrollamount.holidayovertime = this.payrollrate.holidayovertime * this.payrollhour.holidayovertime;
      if(!this.checkIfEmployeIsSet()){
        return;
      }
      this.calculateGrossSalary();
    }

      AddNewPayrollAmount(){
        if(this.currentemployeeincontext){
          this.payrollservice.AddNewPayrollAmount(this.payrollamount)
          .subscribe((response)=>{this.storageService.openDialog("PAYROLL",response.toString(),"N");
          this.templateEditService.save(TemplateCrudService.EMPLOYEE_PAYROLL_GETALL,
            TemplateCrudService.EMPLOYEE_PAYROLL_PRINT_ADD,this.currentemployeeincontext);
          this.ClearPayrollAmount();},
                      (error)=>{this.externalService.logError(error)});
          
        }
        else{
          this.storageService.openSnackbarForSuccessTopLeft("Employee not selected");
        }
      }

    ClearPayrollAmount(){
      this.payrollrate = new PayrollRate();
      this.payrollhour = new PayrollHour();
    }
}
