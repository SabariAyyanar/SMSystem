import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../service/student.service';
import { StorageService } from '../../../service/storage.service';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { PageChangeEvent, DataStateChangeEvent } 
            from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { EditService } from '../../../service/exam.service';
import { State,process } from '@progress/kendo-data-query';
import {FormArray,FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { CollectionService } from '../../../service/collections.required';
import { ExternalService } from '../../../service/external.service';
import { Observable } from 'rxjs/Observable';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  public formGroup: FormGroup;
  private heroform:FormGroup;
  
  private gridView: GridDataResult;
  isUpdate:boolean = false;

  constructor(private editService: EditService,
    public studentService:StudentService,
    private storageService:StorageService,
    private fb:FormBuilder,
    private externalService:ExternalService) {
      
    }

public position: 'top' | 'bottom' | 'both' = 'top';
    public onStateChange(state: DataStateChangeEvent) {
      this.gridState = state;
      this.editService.read();
  }

    public view: Observable<GridDataResult>;

    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10,

        filter: {
        logic: 'and',
        filters: [{ field:
          'student.firstname',operator: 'contains',
         value:'Dede' }]
      }
    };


    printAllHandler(event){
    
    
    }

    

    printHandler(event){
      this.studentService.PrintExam(event).subscribe(()=>{});
    }

  ngOnInit() {
    this.view = this.editService.map(data => process(data, this.gridState));    
    this.editService.read();
  }

}
