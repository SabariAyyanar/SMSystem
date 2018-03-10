import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { StorageService } from '../../../service/storage.service';
import { ExternalService } from '../../../service/external.service';
import { MiscellaneousService } from '../../../service/miscellaneous.service';
import { CollectionService } from '../../../service/collections.required';
import { Expense, ExpenseCategory } from '../../../models/miscellaneous';
import { PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { State,process } from '@progress/kendo-data-query';
import { TemplateCrudService } from '../../../service/BehaviorialService/template.service';
import { TemplateEditService } from '../../../service/BehaviorialService/templatebehavourial.service';
import { Observable } from 'rxjs/Observable';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.scss']
})
export class AddexpenseComponent implements OnInit {

  
  expenseform:FormGroup;
  isUpdate:boolean = false;
  
    private gridView: GridDataResult;
  
     constructor(private storageService:StorageService,
      private collectionService:CollectionService,
      private templateEditService:TemplateEditService,
      private miscellaneousService:MiscellaneousService,
      private externalService:ExternalService,
        private fb:FormBuilder) {
              this.loadPrequisiteData();
              this.BuildExpenseForm();
      }
  
      public position: 'top' | 'bottom' | 'both' = 'top';
      public onStateChange(state: DataStateChangeEvent) {
        this.gridState = state;      
        this.templateEditService.read(TemplateCrudService.EXPENSE_GETALL);
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
            'expensecategory.firstname',operator: 'contains',
           value:'' }]
        }
  };
  
    // end for grid variables
  
    
  
    //BEGIN CRUD OPERATION ON EXPENSE
  
  //VARIABLES FOR Managing Expense
  currentexpenseincontext:Expense = new Expense();
  expensecategoryid="";
  allexpensecategory:ExpenseCategory[] = this.miscellaneousService.getAllExpenseCategory();
  
    BuildExpenseForm(){
      this.isUpdate = false;
      this.expenseform = this.fb.group({
        Id:'',
        expensecategoryId: [null,Validators.required],
        description: [null,Validators.required],
        amount: [null,Validators.required],
        dateofexpense: [null,Validators.required]
      })
    }
  
      loadPrequisiteData(){
        if(!this.allexpensecategory){
          this.getAllExpenseFromDatabase();
        }
      }
  
      getAllExpenseFromDatabase(){
        this.miscellaneousService.GetAllExpenseCategory()
        .subscribe((response)=>{this.allexpensecategory = response;})
      }
  
      AddNewExpense(){
        if(this.expenseform.valid){
          this.currentexpenseincontext = this.expenseform.getRawValue();
          this.templateEditService.save(TemplateCrudService.EXPENSE_GETALL,
            TemplateCrudService.EXPENSE_ADD,this.currentexpenseincontext);
           this.storageService.openDialog("EXPENSE","Expense Successfully Saved".toString(),"N");   
           this.ClearExpenseForm();
        }
        else{
          this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
        }
      }
  
      UpdateOldExpense(){ 
        this.currentexpenseincontext = this.expenseform.getRawValue();
        if(!this.currentexpenseincontext.Id){
          this.storageService.openSnackbarForSuccessTopLeft("Old Expense To Edit is not selected");
          return;
        }
       else if(this.expenseform.valid){
         
          this.templateEditService.save(TemplateCrudService.EXPENSE_GETALL,
          TemplateCrudService.EXPENSE_UPDATE,this.currentexpenseincontext);
           this.storageService.openDialog("EXPENSE","Expense Successfully Updated".toString(),"N");
           this.ClearExpenseForm(); 
        }
        else{
          this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
        }
      }
  
      ClearExpenseForm(){
        this.isUpdate = false;
        this.expenseform.reset();
      }
  
      resetExpenseForm(){
        this.BuildExpenseForm();
      }
  
      //END CRUD OPERATION ON EXPENSE
  
  
      //BEGIN CRUD OPERATION ON TABLE GRID
      
      
    
      public editHandler({sender, rowIndex, dataItem}) {
        this.isUpdate = true;
        this.expenseform.setValue({'Id':dataItem.Id,
                                'description':dataItem.description,
                                'expensecategoryId':dataItem.expensecategoryId,
                                'amount':dataItem.amount,
                                'dateofexpense':dataItem.dateofexpense});
     }
      
    
    
    
    public removeHandler({dataItem}) {
        this.templateEditService.remove(TemplateCrudService.EXPENSE_GETALL,TemplateCrudService.EXPENSE_REMOVE,
          dataItem);
    }
      
    ngOnInit() {
      this.view = this.templateEditService.map(data => process(data, this.gridState));    
      this.templateEditService.read(TemplateCrudService.EXPENSE_GETALL);
    }
}
