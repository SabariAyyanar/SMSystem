import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Output,EventEmitter } from '@angular/core';
import { weekdays } from 'moment';
import { PayrollService } from '../../../../../service/payroll.service';
import { StorageService } from '../../../../../service/storage.service';
import { ExternalService } from '../../../../../service/external.service';
import { PayrollDate } from '../../../../../models/payrollmodel';

@Component({
  selector: 'app-setpayroll',
  templateUrl: './setpayroll.component.html',
  styleUrls: ['./setpayroll.component.scss']
})
export class SetpayrollComponent implements OnInit {


  startdate:Date = moment().subtract(1,'M').toDate();
  enddate:Date = moment().toDate();
  public daysArr;
  constructor(private storageService:StorageService,private externalService:ExternalService,
    private cdr:ChangeDetectorRef,
    private payrollService:PayrollService) { 
  }

      ngOnInit() {
        
      }


   ngAfterViewInit(){
    this.daysArr = this.createCalender();
    this.cdr.detectChanges();
   }


   arrayForContainingSelectedDays = new Array();
   isSaturdayIgnored:boolean;
   isSundayIgnored:boolean;

   totaldayscountting:number;

  createCalender(){
    this.isSaturdayIgnored = false;
    this.isSundayIgnored = false;
    var start = moment(this.startdate);
    var end = moment(this.enddate);
    var startday = parseInt(start.format('DD'));

    var totalnumberofmonths = end.diff(start,'month');
    if(totalnumberofmonths > 1){
      this.storageService.openSnackbar("Range of month selected is more than a month");
      return false;
    }
  
    var totalnumberofdays = end.diff(start,"days");
    this.totaldayscountting = totalnumberofdays;
    var startingweekday = start.weekday();
    var startmonthending = start.daysInMonth();
    var momentarray= new Array();

    for(let n=startday,i=0;n<=totalnumberofdays + startday;n++,i++){      
        momentarray.push(moment(-1).add(n,'d'));  
      }
    for(let n=0; n<startingweekday;n++){
         momentarray.unshift(null);
     }
     

     this.daysArr = momentarray;

   return momentarray;
  }


  applyClass(day){      
    let classes =
    {'inactive':!day,
    'clicked':this.isSelected(day)
    }
    return classes;
  }

  IgnoreSaturday(){
    for(var key in this.daysArr){
      if(this.daysArr[key]){
        if(this.daysArr[key].weekday() == 5){
          this.isSelected(this.daysArr[key]);
        }
      }
    }
  }

  IgnoreSunday(){
    for(var key in this.daysArr){
      if(this.daysArr[key]){
        if(this.daysArr[key].weekday() == 6){
          this.isSelected(this.daysArr[key]);
        }
      }
    }
  }


  isSelected(day){
      if(!day){
        return;
      }
      for(var key in this.arrayForContainingSelectedDays){
        if(this.arrayForContainingSelectedDays[key] === day){
          this.arrayForContainingSelectedDays.splice(parseInt(key),1);
          return true;
        }
      }
      this.arrayForContainingSelectedDays.push(day);
      return false;
  }

  SaveNewPayrollDates(){
    if(this.startdate && this.enddate){
     let payrolldate = new PayrollDate();
     payrolldate.startdate = this.startdate;
     payrolldate.enddate = this.enddate;
     payrolldate.numberofdays = this.totaldayscountting + 1
     - this.arrayForContainingSelectedDays.length;

      this.payrollService.AddNewPayrollDate(payrolldate)
      .subscribe((response)=>{this.storageService.openDialog("PAYROLL DATE",response.toString(),"N");},
                  (error)=>{this.externalService.logError(error)});
      
    }
    else{
      this.storageService.openSnackbarForSuccessTopLeft("Date not set");
    }
  }
}



