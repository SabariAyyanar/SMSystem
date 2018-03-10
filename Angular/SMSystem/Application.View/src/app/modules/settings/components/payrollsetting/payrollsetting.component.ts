import { Component, OnInit } from '@angular/core';
import { SSNITRate, TaxRate, PayrollRate, PayrollAllowance } from '../../../../models/payrollmodel';
import { CollectionService } from '../../../../service/collections.required';
import { ExternalService } from '../../../../service/external.service';
import { LoaderService } from '../../../../service/loader.service';
import { StorageService } from '../../../../service/storage.service';

@Component({
  selector: 'app-payrollsetting',
  templateUrl: './payrollsetting.component.html',
  styleUrls: ['./payrollsetting.component.scss']
})
export class PayrollsettingComponent implements OnInit {

  currenttaxratesincontext:TaxRate = new TaxRate();
  currentpayrollallowanceincontext:PayrollAllowance = new PayrollAllowance();
  constructor(private collectionService:CollectionService,private loaderService:LoaderService,
              private externalService:ExternalService,private storageService:StorageService) { 
                this.loadPrequisiteData();
              }

  alltaxrates: TaxRate[] = this.collectionService.getAllTaxRates();
  allpayrollallowances: PayrollAllowance[] = this.collectionService.getAllPayrollAllowances();
  currentpayrollratesincontext:PayrollRate = this.collectionService.getAllPayrollRates();
  currentssnitratesincontext:SSNITRate = this.collectionService.getAllSSNITRates();

 
  
  ngOnInit() {
    this.loaderService.displayLoading();

  }


  ngAfterContentInit(){        
    this.loaderService.dismissLoading();
      }


loadPrequisiteData(){  
  if(!this.currentpayrollratesincontext){
    this.getAllPayrollRatesFromDatabase();
   }

  if(!this.alltaxrates){
   this.getAllTaxRatesFromDatabase();
  }

  if(!this.currentssnitratesincontext){
    this.getAllSSNITRatesFromDatabase();
   }

   if(!this.allpayrollallowances){
    this.getAllPayrollAllowanceFromDatabase();
   }

}


  //Loading data from database
    //BEGIN
  getAllPayrollRatesFromDatabase(){
        this.loaderService.displayLoading();

      this.collectionService.GetAllPayrollRates()
      .subscribe((response)=>{   
        this.currentpayrollratesincontext = response==null? new PayrollRate():response;
        this.loaderService.dismissLoading();
      },

      (err)=>{
        this.loaderService.dismissLoading();
        this.externalService.logError(err)
      });       
  }


  getAllTaxRatesFromDatabase(){
        this.loaderService.dismissLoading();
      this.collectionService.GetAllTaxRates()
      .subscribe((response)=>{
        this.alltaxrates = response;
        this.loaderService.dismissLoading();},
      (err)=>{this.externalService.logError(err)
            this.loaderService.dismissLoading();
      });         
  }

  getAllSSNITRatesFromDatabase(){
          this.loaderService.dismissLoading();
        this.collectionService.GetAllSSNITRates()
        .subscribe((response)=>{
          this.currentssnitratesincontext = response;
          this.loaderService.dismissLoading();},
        (err)=>{this.externalService.logError(err)
              this.loaderService.dismissLoading();
        });
  }

      getAllPayrollAllowanceFromDatabase(){
            this.loaderService.dismissLoading();
          this.collectionService.GetAllPayrollAllowances()
          .subscribe((response)=>{
            this.allpayrollallowances = response;
            this.loaderService.dismissLoading();},
          (err)=>{this.externalService.logError(err)
                this.loaderService.dismissLoading();
          });
      }

  //setting the allowance percent of the selected employee category
  displayOldTaxRates(){
    let num = this.storageService
    .SearchIndexPosition(this.currenttaxratesincontext.Id,this.alltaxrates);
    this.currenttaxratesincontext.amount
    =  this.alltaxrates[num].amount;
    this.currenttaxratesincontext.rate
    =  this.alltaxrates[num].rate; 
  }


  displayOldAllowanceAmount(){
    let num = this.storageService
    .SearchIndexPosition(this.currentpayrollallowanceincontext.Id,this.allpayrollallowances);
    this.currentpayrollallowanceincontext.amount
    =  this.allpayrollallowances[num].amount; 
  }

//CRUD For entities addition , update and removal taxes
    //BEGIN tax 
addNewTax(){

  if(!this.currenttaxratesincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  if(!this.currenttaxratesincontext.rate){
    this.storageService.openSnackbar("Rate cannot be empty");
    return;
  }
  this.collectionService.AddNewTaxRates(this.currenttaxratesincontext)
    .subscribe(
      (response) => {
    this.storageService.openDialog("TAX",response.toString(),"N");
    this.alltaxrates.push(this.currenttaxratesincontext);
    this.currenttaxratesincontext = new TaxRate();
    },
      err => {this.storageService.openSnackbar(err.message)
              this.externalService.logError(err)});
}

updateOldTax(){
  if(!this.currenttaxratesincontext.Id){
    this.storageService.openSnackbar("Tax not selected");
    return;
  }
  if(!this.currenttaxratesincontext.name){
    this.storageService.openSnackbar("New Name cannot be empty");
    return;
  }
  if(!this.currenttaxratesincontext.rate){
    this.storageService.openSnackbar("Rate cannot be empty");
    return;
  }
  this.collectionService.UpdateOldTaxRates(this.currenttaxratesincontext)
  .subscribe(
    (response) => {
    this.storageService.openDialog("TAX",response.toString(),"N"); 
    let num = this.storageService.SearchIndexPosition(this.currenttaxratesincontext.Id,this.alltaxrates);
    this.alltaxrates[num] 
    = this.currenttaxratesincontext;
    this.currenttaxratesincontext = new TaxRate()},
    err => {
      this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}

removeOldTax(){
  if(!this.currenttaxratesincontext.Id){
    this.storageService.openSnackbar("Tax not selected");
    return;
  }
  this.collectionService.RemoveOldTaxRates(this.currenttaxratesincontext)
  .subscribe(
    (response) => {
    this.storageService.openDialog("TAX",response.toString(),"N");
    let num = this.storageService.SearchIndexPosition(this.currenttaxratesincontext.Id,this.alltaxrates);
    this.alltaxrates.splice(num,1)},
    err => {this.storageService.openSnackbar(err.message)
      this.externalService.logError(err)});
}
    //END Tax


  // Saving ssnit rate
      //BEGIN

      saveSSNITRate(){
        if(!this.currentssnitratesincontext.name){
          this.storageService.openSnackbar("New Name cannot be empty");
          return;
        }
        if(!this.currentssnitratesincontext.Rate){
          this.storageService.openSnackbar("SSNIT Rate cannot be empty");
          return;
        }
        this.loaderService.displayLoading();
        this.collectionService.SaveSSNITRate(this.currentssnitratesincontext)
          .subscribe(
            (response) => {
              this.storageService.openDialog("SSNIT",response.toString(),"N");
              this.loaderService.dismissLoading();
          },
            err => {this.storageService.openSnackbar(err.message)
                    this.externalService.logError(err);
                  this.loaderService.dismissLoading();
                  });
        }

    //END


    //Saving payroll ratess

    SavePayrollRate(){   
      this.collectionService.SaveOldPayrollRates(this.currentpayrollratesincontext)
      .subscribe(
        (response) => {this.storageService.openDialog("ALLOWANCE",response.toString(),"N"); },
        err => {this.storageService.openSnackbar(err.message)
          this.externalService.logError(err)});
    }


    //CRUD For entities addition , update and removal allowances
  addNewPayrollAllowance(){
  
    if(!this.currentpayrollallowanceincontext.name){
      this.storageService.openSnackbar("New Name cannot be empty");
      return;
    }
    if(!this.currentpayrollallowanceincontext.amount){
      this.storageService.openSnackbar("Amount cannot be empty");
      return;
    }
    this.collectionService.AddNewPayrollAllowances(this.currentpayrollallowanceincontext)
      .subscribe(
        (response) => {this.storageService.openDialog("ALLOWANCE",response.toString(),"N");
      this.allpayrollallowances.push(this.currentpayrollallowanceincontext);
      this.currentpayrollallowanceincontext = new PayrollAllowance();
      },
        err => {this.storageService.openSnackbar(err.message)
                this.externalService.logError(err)});
  }
  
  updateOldPayrollAllowance(){
    if(!this.currentpayrollallowanceincontext.Id){
      this.storageService.openSnackbar("Allowance not selected");
      return;
    }
    if(!this.currentpayrollallowanceincontext.name){
      this.storageService.openSnackbar("New Name cannot be empty");
      return;
    }
    if(!this.currentpayrollallowanceincontext.amount){
      this.storageService.openSnackbar("Amount cannot be empty");
      return;
    }
    this.collectionService.UpdateOldPayrollAllowances(this.currentpayrollallowanceincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("ALLOWANCE",response.toString(),"N"); 
      let num = this.storageService.SearchIndexPosition(this.currentpayrollallowanceincontext.Id,this.allpayrollallowances);
      this.allpayrollallowances[num] 
      = this.currentpayrollallowanceincontext;
      this.currentpayrollallowanceincontext = new PayrollAllowance()},
      err => {this.storageService.openSnackbar(err.message)
        this.externalService.logError(err)});
  }
  
  removeOldPayrollAllowance(){
    if(!this.currentpayrollallowanceincontext.Id){
      this.storageService.openSnackbar("Payroll Allowance not selected");
      return;
    }
    this.collectionService.RemoveOldPayrollAllowances(this.currentpayrollallowanceincontext)
    .subscribe(
      (response) => {this.storageService.openDialog("ALLOWANCE",response.toString(),"N");
      let num = this.storageService.SearchIndexPosition(this.currentpayrollallowanceincontext.Id,this.allpayrollallowances);
      this.allpayrollallowances.splice(num,1)},
      err => {this.storageService.openSnackbar(err.message)
        this.externalService.logError(err)});
  }

      //END payroll allowances

}
