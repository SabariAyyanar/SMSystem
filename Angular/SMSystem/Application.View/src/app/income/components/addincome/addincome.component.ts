import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { StorageService } from '../../../service/storage.service';
import { ExternalService } from '../../../service/external.service';
import { MiscellaneousService } from '../../../service/miscellaneous.service';
import { CollectionService } from '../../../service/collections.required';
import { Income, IncomeCategory } from '../../../models/miscellaneous';
import { PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { State,process } from '@progress/kendo-data-query';
import { TemplateCrudService } from '../../../service/BehaviorialService/template.service';
import { TemplateEditService } from '../../../service/BehaviorialService/templatebehavourial.service';
import { Observable } from 'rxjs/Observable';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-addincome',
  templateUrl: './addincome.component.html',
  styleUrls: ['./addincome.component.scss']
})
export class AddincomeComponent implements OnInit {


  incomeform:FormGroup;
isUpdate:boolean = false;

  private gridView: GridDataResult;

   constructor(private storageService:StorageService,
    private collectionService:CollectionService,
    private templateEditService:TemplateEditService,
    private miscellaneousService:MiscellaneousService,
    private externalService:ExternalService,
      private fb:FormBuilder) {
            this.loadPrequisiteData();
            this.BuildIncomeForm();
    }

    public position: 'top' | 'bottom' | 'both' = 'top';
    public onStateChange(state: DataStateChangeEvent) {
      this.gridState = state;      
      this.templateEditService.read(TemplateCrudService.INCOME_GETALL);
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
          'incomecategory.firstname',operator: 'contains',
         value:'' }]
      }
};

  // end for grid variables

  

  //BEGIN CRUD OPERATION ON INCOME

//VARIABLES FOR Managing Income
currentincomeincontext:Income = new Income();
incomecategoryid="";
allincomecategory:IncomeCategory[] = this.miscellaneousService.getAllIncomeCategory();

  BuildIncomeForm(){
    this.isUpdate = false;
    this.incomeform = this.fb.group({
      Id:'',
      incomecategoryId: [null,Validators.required],
      description: [null,Validators.required],
      amount: [null,Validators.required],
      dateofincome: [null,Validators.required]
    })
  }

    loadPrequisiteData(){
      if(!this.allincomecategory){
        this.getAllIncomeFromDatabase();
      }
    }

    getAllIncomeFromDatabase(){
      this.miscellaneousService.GetAllIncomeCategory()
      .subscribe((response)=>{this.allincomecategory = response;})
    }

    AddNewIncome(){
      if(this.incomeform.valid){
        this.currentincomeincontext = this.incomeform.getRawValue();
        this.templateEditService.save(TemplateCrudService.INCOME_GETALL,
          TemplateCrudService.INCOME_ADD,this.currentincomeincontext);
         this.storageService.openDialog("INCOME","Income Successfully Saved".toString(),"N");   
         this.ClearIncomeForm();
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
      }
    }

    UpdateOldIncome(){ 
      this.currentincomeincontext = this.incomeform.getRawValue();
      if(!this.currentincomeincontext.Id){
        this.storageService.openSnackbarForSuccessTopLeft("Old Income To Edit is not selected");
        return;
      }
     else if(this.incomeform.valid){
       
        this.templateEditService.save(TemplateCrudService.INCOME_GETALL,
        TemplateCrudService.INCOME_UPDATE,this.currentincomeincontext);
         this.storageService.openDialog("INCOME","Income Successfully Updated".toString(),"N");
         this.ClearIncomeForm(); 
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
      }
    }

    ClearIncomeForm(){
      this.isUpdate = false;
      this.incomeform.reset();
    }

    resetIncomeForm(){
      this.BuildIncomeForm();
    }

    //END CRUD OPERATION ON INCOME


    //BEGIN CRUD OPERATION ON TABLE GRID
    
    
  
    public editHandler({sender, rowIndex, dataItem}) {
      this.isUpdate = true;
      this.incomeform.setValue({'Id':dataItem.Id,
                              'description':dataItem.description,
                              'incomecategoryId':dataItem.incomecategoryId,
                              'amount':dataItem.amount,
                              'dateofincome':dataItem.dateofincome});
   }
    
  
  
  
  public removeHandler({dataItem}) {
      this.templateEditService.remove(TemplateCrudService.INCOME_GETALL,TemplateCrudService.INCOME_REMOVE,
        dataItem);
  }
    
  ngOnInit() {
    this.view = this.templateEditService.map(data => process(data, this.gridState));    
    this.templateEditService.read(TemplateCrudService.INCOME_GETALL);
  }
  
}
