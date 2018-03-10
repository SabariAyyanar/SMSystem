import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/studentmodel';
import {DomSanitizer} from '@angular/platform-browser';
import {StudentService} from '../../../service/student.service';
import {StorageService} from '../../../service/storage.service';
import {MatSnackBar,MatDialog} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { Payment, PaymentHistory } from '../../../models/paymentmodel';
import { PaymentService } from '../../../service/payment.service';
import {StudentClass,Department, StudentStatus, Region} from '../../../models/collections';
import {CollectionService} from '../../../service/collections.required';
import { ExternalService } from '../../../service/external.service';

@Component({
  selector: 'app-managefees',
  templateUrl: './managefees.component.html',
  styleUrls: ['./managefees.component.scss']
})
export class ManagefeesComponent implements OnInit {

  constructor(public dialog:MatDialog,public matSnackBar:MatSnackBar,public paymentService:PaymentService,public studentService:StudentService,
    private storageService:StorageService,private sanitizer:DomSanitizer,
    private collectionservice:CollectionService,private externalService:ExternalService) {

      this.loadPrequisiteData();
  }

  ngOnInit() {
  }


  
 //variables for managing students
makepaymentbuttondisable:boolean = true;
updatedeletedisable:boolean = true;
allstudent:Student[] = this.studentService.getAllStudent();
  search:any = {
    studentclass:'',
    department: '',
    firstname: ''
  }


  //variables for managing students fees
  searchpayment:any = {
    studentclass:'',
    department: '',
    firstname: ''
  }

 
allpayment:PaymentHistory[] = this.paymentService.getAllPaymentHistory();
studentpayment = new Payment();
paymenthistorytosave= new PaymentHistory();
currentpaymentstudent :Student[] = [];



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

    if(!this.allpayment){
      this.getAllPaymentFromDatabase();
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

    getAllPaymentFromDatabase(){
      this.paymentService.GetAllPaymentHistory()
      .subscribe((response)=>this.allpayment = response,
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
      this.collectionservice.GetAllStudentClasses()
      .subscribe((response)=>this.region = response,
      (err)=>{this.externalService.logError(err)});
    }


//BEGIN FEES --function and procedures for fees

  filterObjectForPayment(){
   
    if(this.searchpayment.studentclass.toString() ==="" && this.searchpayment.department.toString()==="" &&
     this.searchpayment.firstname.toString()===""){
      this.clearPaymentInputFields();
      return;
    }

   var re = new RegExp(this.searchpayment.firstname.toString().toLowerCase()),Key;
   if(this.allstudent){
    this.currentpaymentstudent =  this.allstudent.filter(e => {
         return e.studentclass.toString().includes(this.searchpayment.studentclass)
          && e.department.toString().includes(this.searchpayment.department)
          && re.test(e.firstname.toLowerCase());
     });
   }
   if(this.currentpaymentstudent[0]){
    this.makepaymentbuttondisable = false;
     this.paymentService.GetStudentPaymentDetails(this.currentpaymentstudent[0].Id)
                          .subscribe((response)=> {this.studentpayment = response;},
                          (err) =>{this.externalService.logError(err)});
   }
   else{
    this.clearPaymentInputFields();
   }
  }

  addNewPayment(){
  if(this.paymenthistorytosave.amount > this.studentpayment.amountowing){
     let dialogRef:any = this.storageService.openDialogToWaitConfirmation("PREPAYMENT CONFIRMATION","Amount to pay is " +
     "greater than student amount owing. Do you want to make PREPAYMENT ?","Y");
      dialogRef.afterClosed().subscribe(result => {
        if(result.toLowerCase() ==  'cancel'){
          return;
        }
        else{
          this.savePayment();
        }
      });         
  }
  else{
    this.savePayment();
  }
  }

  savePayment(){
    if(this.currentpaymentstudent[0]){
      this.paymenthistorytosave.studentId = this.currentpaymentstudent[0].Id;
      this.paymentService.AddPayment(this.paymenthistorytosave)
      .subscribe(
        (response) => {this.storageService.openDialog("NEW STUDENT",response.toString(),"N");
        this.paymenthistorytosave.student = this.currentpaymentstudent[0];
        this.allpayment.unshift(this.paymenthistorytosave);this.clearPaymentInputFields()},
        err => {this.storageService.openSnackbar(err.message);
                this.externalService.logError(err)});
      }
      else{
        return;
      }
  }

  clearPaymentInputFields()
{
  this.makepaymentbuttondisable = true;
  this.currentpaymentstudent = [];
  this.studentpayment = new Payment();
  this.paymenthistorytosave = new PaymentHistory();
}

editPaymentHistory(payment){
  let dialogRef:any = this.storageService.openDialogToEditPayment(payment);
   dialogRef
   .afterClosed().subscribe(result => {
     if(result[0].toLowerCase() ==='update'){
      let paymenthistorytoupdate =  result[1][0];
      this.paymentService.UpdatePayment(paymenthistorytoupdate)
      .subscribe(
        (response) => {
          this.storageService.openSnackbarForSuccess(response.toString());
         let index =  this.allpayment.indexOf(payment);
         if(index > -1){
           this.allpayment[index] = paymenthistorytoupdate;
         }
        },
        err => {this.storageService.openSnackbar(err.message);
          this.externalService.logError(err)}
      )
     }
     else if(result[0].toLowerCase() ==='remove'){
      this.paymentService.RemovePayment(payment)
      .subscribe(
        (response) => {
          this.storageService.openSnackbar(response.toString());
         let index =  this.allpayment.indexOf(payment);
         if(index > -1){
           this.allpayment.splice(index,1);
         }
        },
        (err) => {this.storageService.openSnackbar(err.message);
          this.externalService.logError(err)}
      )}
      else{
        return;
        }
   });      
}

// END OF FEES


}
