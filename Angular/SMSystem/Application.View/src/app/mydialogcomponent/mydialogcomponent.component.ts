import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-mydialogcomponent',
  templateUrl: './mydialogcomponent.component.html',
  styleUrls: ['./mydialogcomponent.component.scss']
})
export class MydialogcomponentComponent implements OnInit {

  constructor(public thisdialogref:MatDialogRef<MydialogcomponentComponent>,@Inject(MAT_DIALOG_DATA)public data:string[]) {
    
   }

  ngOnInit() {
  }

  onCloseConfirm(){
    this.thisdialogref.close('OK');
  }
  onCloseCancel(){
    this.thisdialogref.close('Cancel');
  }

}
