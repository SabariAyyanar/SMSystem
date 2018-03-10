import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../../../service/external.service';
import { EmailInfo, SMSInfo } from '../../../models/external';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-notifcations',
  templateUrl: './notifcations.component.html',
  styleUrls: ['./notifcations.component.scss']
})
export class NotifcationsComponent implements OnInit {

  currnetemailinfoincontext:EmailInfo = this.externalService.getSMSInfo();
  currentsmsinfoincontext:SMSInfo = this.externalService.getEmailInfo();

  constructor(private externalService:ExternalService,private storageService:StorageService) { 
    this.LoadPrequisiteData();
  }

      ngOnInit() {
        
      }


      LoadPrequisiteData(){  
        if(!this.currnetemailinfoincontext){
          this.getEmailDataFromDatabase();
        }
      
        if(!this.currentsmsinfoincontext){
        this.getSMSDataFromDatabase();
        }
      
      }

  getEmailDataFromDatabase(){
    this.externalService.ReadEmailData()
    .subscribe((response)=>this.currnetemailinfoincontext = response,
    (err)=>this.externalService.logError(err.message));
    }
    
    
    getSMSDataFromDatabase(){
    this.externalService.ReadSMSData()
    .subscribe((response)=>this.currentsmsinfoincontext = response,
    (err)=>this.externalService.logError(err.message));
    }

    saveEmailInfo(){
      this.externalService.SaveEmailData(this.currnetemailinfoincontext)
      .subscribe(
        (response) => {this.storageService.openDialog("EMAIL",response.toString(),"N");
      },
        (err) =>{this.storageService.openSnackbar(err.message);this.externalService.logError(err)});
    }

    saveSMSInfo(){
      this.externalService.SaveSMSData(this.currentsmsinfoincontext)
      .subscribe(
        (response) => {this.storageService.openDialog("SMS",response.toString(),"N");
      },
        (err) =>{this.storageService.openSnackbar(err.message);this.externalService.logError(err)});
    }

}
