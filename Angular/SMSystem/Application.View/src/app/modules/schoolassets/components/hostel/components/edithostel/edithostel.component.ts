import { Component, OnInit } from '@angular/core';
import {FormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { StorageService } from '../../../../../../service/storage.service';
import { CollectionService } from '../../../../../../service/collections.required';
import { MiscellaneousService } from '../../../../../../service/miscellaneous.service';
import { ExternalService } from '../../../../../../service/external.service';
import { IncomeCategory, Hostel} from '../../../../../../models/miscellaneous';

@Component({
  selector: 'app-edithostel',
  templateUrl: './edithostel.component.html',
  styleUrls: ['./edithostel.component.scss']
})
export class EdithostelComponent implements OnInit {

  constructor(private storageService:StorageService,private collectionService:CollectionService,
    private externalService:ExternalService,private miscellaneousService:MiscellaneousService,
      private fb:FormBuilder) {
     this.loadPrequisiteData();
     this.BuildIncomeForm();
    }

  hostelform:FormGroup;

  ngOnInit() {
  }

//VARIABLES FOR Managing Income
updatedeletedisable:boolean = false;
currenthostelcategoryincontext:IncomeCategory = new IncomeCategory();
hostelcategoryid="";
allhostel:Hostel[] = this.miscellaneousService.getAllHostel();

  BuildIncomeForm(){
    this.updatedeletedisable = false;
    this.hostelform = this.fb.group({
      Id: null,
      name: [null,Validators.required],
      location: [null,Validators.required]
    })
  }

    loadPrequisiteData(){
      if(!this.allhostel){
        this.getAllHostelFromDatabase();
      }
    }

    getAllHostelFromDatabase(){
      this.miscellaneousService.GetAllHostel()
      .subscribe((response)=>{this.allhostel = response;})
    }

    AddNewHostel(){
      if(this.hostelform.valid){
        this.currenthostelcategoryincontext = this.hostelform.getRawValue();
        this.miscellaneousService.AddNewHostel(this.currenthostelcategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("HOSTEL",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currenthostelcategoryincontext.Id,this.allhostel);
        this.allhostel.push(this.currenthostelcategoryincontext);
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});        
      }
      else if(this.hostelform.value.name){
        this.storageService.openSnackbarForSuccessTopLeft("Please provide name for hostel");
        return;
      }
      else if(this.hostelform.value.location){
        this.storageService.openSnackbarForSuccessTopLeft("Please provide location for hostel");
        return;
      }
    }

    UpdateOldHostel(){
      if(this.hostelform.valid){
        this.currenthostelcategoryincontext = this.hostelform.getRawValue();
        this.miscellaneousService.UpdateOldHostel(this.currenthostelcategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("HOSTEL",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currenthostelcategoryincontext.Id,this.allhostel);
        this.allhostel[index] = this.currenthostelcategoryincontext;
        this.resetIncomeForm()},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else if(this.hostelform.value.Id){
        this.storageService.openSnackbarForSuccessTopLeft("Please select hostel to modify");
        return;
      }
      else if(this.hostelform.value.name){
        this.storageService.openSnackbarForSuccessTopLeft("Please provide name for hostel");
        return;
      }
      else if(this.hostelform.value.location){
        this.storageService.openSnackbarForSuccessTopLeft("Please provide location for hostel");
        return;
      }
    }

    DeleteOldHostel(){
      if(this.hostelform.value.Id){
        this.currenthostelcategoryincontext = this.hostelform.getRawValue();
        this.miscellaneousService.RemoveOldHostel(this.currenthostelcategoryincontext)
        .subscribe((response)=>{this.storageService.openDialog("HOSTEL",response.toString(),"N");
        let index = this.storageService.SearchIndexPosition(this.currenthostelcategoryincontext.Id,this.allhostel);
        this.allhostel.splice(index,1)
        this.resetIncomeForm();},
                    (error)=>{this.externalService.logError(error)});
        
      }
      else{
        this.storageService.openSnackbarForSuccessTopLeft("Hostel not selected");
      }
    }

    modelChange(id){
      if(id){
     let index = this.storageService.SearchIndexPosition(id,this.allhostel);
      this.hostelform.patchValue({'name':this.allhostel[index].name,'location':this.allhostel[index].location});
      this.updatedeletedisable = true;
      }
    }

    resetIncomeForm(){
      this.updatedeletedisable = false;
      this.BuildIncomeForm();
    }

}
