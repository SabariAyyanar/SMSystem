import { Component, OnInit } from '@angular/core';
import {FormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { StorageService } from '../../../../../service/storage.service';
import { CollectionService } from '../../../../../service/collections.required';
import { MiscellaneousService } from '../../../../../service/miscellaneous.service';
import { ExternalService } from '../../../../../service/external.service';
import { IncomeCategory, ExpenseCategory } from '../../../../../models/miscellaneous';

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrls: ['./editexpense.component.scss']
})
export class EditexpenseComponent implements OnInit {

  constructor(private storageService:StorageService,private collectionService:CollectionService,
    private externalService:ExternalService,private miscellaneousService:MiscellaneousService,
      private fb:FormBuilder) {
     this.loadPrequisiteData();
     this.BuildIncomeForm();
    }

  expenseform:FormGroup;

  ngOnInit() {
  }

//VARIABLES FOR Managing Income
updatedeletedisable:boolean = false;
currentexpensecategoryincontext:IncomeCategory = new IncomeCategory();
expensecategoryid="";
allexpensecategory:ExpenseCategory[] = this.miscellaneousService.getAllExpenseCategory();

  BuildIncomeForm(){
    this.updatedeletedisable = false;
    this.expenseform = this.fb.group({
      Id: [null,Validators.required],
      name: [null,Validators.required]
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

    filterObjectForPayment(event){
      
    }

    AddNewExpenseCategory(){
      if(this.expenseform.value.name){
        this.currentexpensecategoryincontext = this.expenseform.getRawValue();
        this.miscellaneousService.AddNewExpenseCategory(this.currentexpensecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("EXPENSE CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentexpensecategoryincontext.Id,this.allexpensecategory);
        this.allexpensecategory.push(this.currentexpensecategoryincontext);
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Name to add not provided");
      }
    }

    UpdateOldExpenseCategory(){
      if(this.expenseform.valid){
        this.currentexpensecategoryincontext = this.expenseform.getRawValue();
        this.miscellaneousService.UpdateOldExpenseCategory(this.currentexpensecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("EXPENSE CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentexpensecategoryincontext.Id,this.allexpensecategory);
        this.allexpensecategory[index] = this.currentexpensecategoryincontext;
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Expense Category and new name is required");
      }
    }

    DeleteOldExpenseCategory(){
      if(this.expenseform.value.Id){
        this.currentexpensecategoryincontext = this.expenseform.getRawValue();
        this.miscellaneousService.RemoveOldExpenseCategory(this.currentexpensecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("EXPENSE CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentexpensecategoryincontext.Id,this.allexpensecategory);
        this.allexpensecategory.splice(index,1)
        this.resetIncomeForm();},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Expense Category not selected");
      }
    }

    modelChange(id){
      if(id){
     let index = this.storageService.SearchIndexPosition(id,this.allexpensecategory);
      this.expenseform.patchValue({'name':this.allexpensecategory[index].name});
      this.updatedeletedisable = true;
      }
    }

    resetIncomeForm(){
      this.updatedeletedisable = false;
      this.BuildIncomeForm();
    }

}
