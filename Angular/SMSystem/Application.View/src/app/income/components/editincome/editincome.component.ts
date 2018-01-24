import { Component, OnInit } from '@angular/core';
import {FormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { StorageService } from '../../../service/storage.service';
import { CollectionService } from '../../../service/collections.required';
import { MiscellaneousService } from '../../../service/miscellaneous.service';
import { ExternalService } from '../../../service/external.service';
import { IncomeCategory } from '../../../models/miscellaneous';

@Component({
  selector: 'app-editincome',
  templateUrl: './editincome.component.html',
  styleUrls: ['./editincome.component.scss']
})
export class EditincomeComponent implements OnInit {

  
  constructor(private storageService:StorageService,private collectionService:CollectionService,
    private externalService:ExternalService,private miscellaneousService:MiscellaneousService,
      private fb:FormBuilder) {
     this.loadPrequisiteData();
     this.BuildIncomeForm();
    }

  incomeform:FormGroup;

  ngOnInit() {
  }

//VARIABLES FOR Managing Income
updatedeletedisable:boolean = true;
currentincomecategoryincontext:IncomeCategory = new IncomeCategory();
incomecategoryid="";
allincomecategory:IncomeCategory[] = this.miscellaneousService.getAllIncome();

  BuildIncomeForm(){
    this.incomeform = this.fb.group({
      Id: [null,Validators.required],
      name: [null,Validators.required]
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

    filterObjectForPayment(event){
      
    }

    AddNewIncomeCategory(){
      if(this.incomeform.value.name){
        this.currentincomecategoryincontext = this.incomeform.getRawValue();
        this.miscellaneousService.AddNewIncomeCategory(this.currentincomecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("INCOME CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentincomecategoryincontext.Id,this.allincomecategory);
        this.allincomecategory.push(this.currentincomecategoryincontext);
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Name to add not provided");
      }
    }

    UpdateIncomeCategory(){
      if(this.incomeform.valid){
        this.currentincomecategoryincontext = this.incomeform.getRawValue();
        this.miscellaneousService.UpdateOldIncomeCategory(this.currentincomecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("INCOME CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentincomecategoryincontext.Id,this.allincomecategory);
        this.allincomecategory[index] = this.currentincomecategoryincontext;
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Income Category and new name is required");
      }
    }

    DeleteIncomeCategory(){
      if(this.incomeform.value.Id){
        this.currentincomecategoryincontext = this.incomeform.getRawValue();
        this.miscellaneousService.RemoveOldIncomeCategory(this.currentincomecategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("INCOME CATEGORY",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currentincomecategoryincontext.Id,this.allincomecategory);
        this.allincomecategory.splice(index,1)
        this.resetIncomeForm();},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Income Category not selected");
      }
    }

    modelChange(id){
      if(id){
     let index = this.storageService.SearchIndexPosition(id,this.allincomecategory);
      this.incomeform.patchValue({'name':this.allincomecategory[index].name});
      }
    }

    resetIncomeForm(){
      this.BuildIncomeForm();
    }
}
