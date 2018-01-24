import { Component, OnInit } from '@angular/core';
import {Student} from '../models/studentmodel';
import {MatSnackBar,MatDialog} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import {CollectionService} from '../service/collections.required';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    
      }



}
