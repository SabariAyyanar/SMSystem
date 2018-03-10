import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { StorageService } from '../../../../../../service/storage.service';
import { ExternalService } from '../../../../../../service/external.service';
import { MiscellaneousService } from '../../../../../../service/miscellaneous.service';
import { CollectionService } from '../../../../../../service/collections.required';
import { Room, Hostel } from '../../../../../../models/miscellaneous';
import { PageChangeEvent, DataStateChangeEvent } 
        from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { map } from 'rxjs/operator/map';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es/data/data.collection';
import { State,process } from '@progress/kendo-data-query';
import { TemplateCrudService } 
from '../../../../../../service/BehaviorialService/template.service';
import { TemplateEditService } 
from '../../../../../../service/BehaviorialService/templatebehavourial.service';
import { Observable } from 'rxjs/Observable';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-addhostel',
  templateUrl: './addhostel.component.html',
  styleUrls: ['./addhostel.component.scss']
})
export class AddhostelComponent implements OnInit {

  
  roomform:FormGroup;
  isUpdate:boolean = false;
  
    private gridView: GridDataResult;
  
     constructor(private storageService:StorageService,
      private collectionService:CollectionService,
      private templateEditService:TemplateEditService,
      private miscellaneousService:MiscellaneousService,
      private externalService:ExternalService,
        private fb:FormBuilder) {
              this.loadPrequisiteData();
              this.BuildRoomForm();
      }
  
      public position: 'top' | 'bottom' | 'both' = 'top';
      public onStateChange(state: DataStateChangeEvent) {
        this.gridState = state;      
        this.templateEditService.read(TemplateCrudService.ROOM_GETALL);
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
            'name',operator: 'contains',
           value:'' }]
        }
  };
  
    // end for grid variables
  
    
  
    //BEGIN CRUD OPERATION ON ROOM
  
  //VARIABLES FOR Managing Room
  currentroomincontext:Room = new Room();
  roomid="";
  allroom:Room[] = this.miscellaneousService.getAllRoom();
  allroomincontext:Room[];
  allhostel:Hostel[] = this.miscellaneousService.getAllHostel();
  
    BuildRoomForm(){
      this.isUpdate = false;
      this.roomform = this.fb.group({
        Id:null,
        hostelId: [null,Validators.required],
        name: [null,Validators.required],
        costperroom: [null,Validators.required],
        studentperroom: [null,Validators.required]
      })
    }
  
      loadPrequisiteData(){
        if(!this.allroom){
          this.getAllRoomFromDatabase();
        }

        if(!this.allhostel){
          this.getAllHostelFromDatabase();
        }
      }
  
      getAllRoomFromDatabase(){
        this.miscellaneousService.GetAllRoom()
        .subscribe((response)=>{this.allroom = response;})
      }

      getAllHostelFromDatabase(){
        this.miscellaneousService.GetAllHostel()
        .subscribe((response)=>{this.allhostel = response;})
      }
  
      AddNewRoom(){
        if(this.roomform.valid){
          this.currentroomincontext = this.roomform.getRawValue();
          this.templateEditService.save(TemplateCrudService.ROOM_GETALL,
            TemplateCrudService.ROOM_ADD,this.currentroomincontext);
           this.storageService.openDialog("ROOM","Room Successfully Saved".toString(),"N");   
           this.ClearRoomForm();
        }
        else{
          this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
        }
      }
  
      UpdateOldRoom(){ 
        this.currentroomincontext = this.roomform.getRawValue();
        if(!this.currentroomincontext.Id){
          this.storageService.openSnackbarForSuccessTopLeft("Old Room To Edit is not selected");
          return;
        }
       else if(this.roomform.valid){
         
          this.templateEditService.save(TemplateCrudService.ROOM_GETALL,
          TemplateCrudService.ROOM_UPDATE,this.currentroomincontext);
           this.storageService.openDialog("ROOM","Room Successfully Updated".toString(),"N");
           this.ClearRoomForm(); 
        }
        else{
          this.storageService.openSnackbarForSuccessTopLeft("Please fill in all fields");
        }
      }
  
      ClearRoomForm(){
        this.isUpdate = false;
        this.roomform.reset();
      }
  
      resetRoomForm(){
        this.BuildRoomForm();
      }
  
      //END CRUD OPERATION ON ROOM
  
  
      //BEGIN CRUD OPERATION ON TABLE GRID
      
      
    
      public editHandler({sender, rowIndex, dataItem}) {
        this.isUpdate = true;
        this.roomform.setValue({'Id':dataItem.Id,
                                'hostelId':dataItem.hostelId,
                                'name':dataItem.name,
                                'costperroom':dataItem.costperroom,
                                'studentperroom':dataItem.studentperroom});
     }
      

     hostelChange(id){
      if(id){
      let index = this.storageService.SearchIndexPosition(id,this.allhostel);
      this.allroomincontext =  this.allhostel[index].rooms;
      }
    }

    roomChange(id){
      if(id){
     let index = this.storageService.SearchIndexPosition(id,this.allroomincontext);
      this.roomform.patchValue({'name':this.allroom[index].name,
      'costperroom':this.allroom[index].costperroom,
      'studentperroom':this.allroom[index].studentperroom});
      this.isUpdate = true;
      }
    }
    
    
    
    public removeHandler({dataItem}) {
        this.templateEditService.remove(TemplateCrudService.ROOM_GETALL,TemplateCrudService.ROOM_REMOVE,
          dataItem);
    }
      
    ngOnInit() {
      this.view = this.templateEditService.map(data => process(data, this.gridState));    
      this.templateEditService.read(TemplateCrudService.ROOM_GETALL);
    }

}
