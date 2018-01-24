import { Component, OnInit } from '@angular/core';
import { Student } from '../models/studentmodel';
import { StudentService } from '../service/student.service';
import { StorageService } from '../service/storage.service';
import { CollectionService } from '../service/collections.required';
import { ExternalService } from '../service/external.service';
import { Department, StudentClass, StudentSubject } from '../models/collections';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss']
})
export class ExaminationComponent implements OnInit {

  
    
  ngOnInit(){
    
  }
}
