
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';
import {PaymentHistory} from '../../models/paymentmodel';

@Component({
  selector: 'app-myeditdialog',
  templateUrl: './myeditdialog.component.html',
  styleUrls: ['./myeditdialog.component.css']
})
export class MyeditdialogComponent implements OnInit {

  constructor(public dialogref:MatDialogRef<MyeditdialogComponent>,@Inject(MAT_DIALOG_DATA)public data:PaymentHistory) { 
   
  }

  ngOnInit() {
  }

  onUpdateConfirm(){
    this.dialogref.close(['update',this.data]);
  }

  onDeleteConfirm(){
    this.dialogref.close(['remove',this.data]);
  }

  onCancelConfirm(){
    this.dialogref.close(['cancel',this.data]);
  }

}
