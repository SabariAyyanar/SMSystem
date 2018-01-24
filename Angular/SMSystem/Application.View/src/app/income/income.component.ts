import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../service/collections.required';
import { StorageService } from '../service/storage.service';
import { ExternalService } from '../service/external.service';
import { MiscellaneousService } from '../service/miscellaneous.service';
import { Income } from '../models/miscellaneous';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private storageService:StorageService,private collectionService:CollectionService,
    private externalService:ExternalService,private miscellaneousService:MiscellaneousService) {
     this.loadPrequisiteData();
    }


  ngOnInit() {
  }

//VARIABLES FOR Managing Income
updatedeletedisable:boolean = true;
currentincomeincontext:Income = new Income();
allincome:Income[] = this.miscellaneousService.getAllIncome();

searchemployee:any = {category:'',department: '', name: ''}

    loadPrequisiteData(){
      if(!this.allincome){
        this.getAllIncomeFromDatabase();
      }
    }

    getAllIncomeFromDatabase(){
      this.miscellaneousService.GetAllIncome()
      .subscribe((response)=>{ this.allincome = response;})
    }

}
