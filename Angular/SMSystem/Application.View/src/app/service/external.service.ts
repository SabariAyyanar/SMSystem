import {Injectable} from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Jsonp } from "@angular/http/src/http";
import { RequestOptions } from "@angular/http/src/base_request_options";
import { MailData, SchoolInfo, EmailInfo, SMSInfo } from "../models/external";

@Injectable()
export class ExternalService{

  constructor(private http:HttpClient, private storageService:StorageService){
        this.LoadPrerequisiteData();
  }

  schoolinfo:SchoolInfo;
  emailinfo:EmailInfo;
  smsinfo:SMSInfo;
  
    LoadPrerequisiteData(){
    
  this.ReadSchoolData().subscribe((response)=> this.schoolinfo = response,
    (err)=> this.logError(err));

    this.ReadEmailData().subscribe((response)=> this.emailinfo = response,
    (err)=> this.logError(err));

    this.ReadSMSData().subscribe((response)=> this.smsinfo = response,
    (err)=> this.logError(err));
  }

    getSchoolInfo():SchoolInfo{
        return this.schoolinfo;
    }
    getEmailInfo():EmailInfo{
        return this.emailinfo;
    }
    getSMSInfo():SMSInfo{
        return this.smsinfo;
    }

      logError(error:string){
          this.LogError(error).subscribe();
      }
    
       WriteDataToFile(message:any):Observable<string>{
         let body = {
             message : message
         }
        return this.http.post(this.storageService.BaseNodeUrl + '/api/writeData',body)
        .map((response:string)=> <string>response)
      }

      ReadDataToFile():Observable<string>{
          let header = new HttpHeaders();
          header.append('Content-Type','application/json; charset=utf-8');
        return this.http.get(this.storageService.BaseNodeUrl + "/api/readData",{headers:header})
        .map((response:string)=> <string>response)
      }

      SendMail(params:MailData):Observable<string>{
          let body = {
              params
          }
        return  this.http.post(this.storageService.BaseNodeUrl + '/api/sendMail',body)
        .map((response:string)=> <string>response)
      }

      LogError(params:string):Observable<string>{
        let body = {
            message: params
        }
      return  this.http.post(this.storageService.BaseNodeUrl + '/api/writeError',body)
        .map((response:string)=> <string>response)    
      }

        //School Data operations
            //BEGIN
      SaveSchoolData(params:SchoolInfo):Observable<string>{
        let body = {
            params
        }
       return this.http.post(this.storageService.BaseNodeUrl + '/bio/schooldata',body)  
        .map((response:string)=> <string>response)    
      }


      ReadSchoolData():Observable<SchoolInfo>{
        let header = new HttpHeaders();
        header.append('Content-Type','application/json; charset=utf-8');
       return this.http.get(this.storageService.BaseNodeUrl + '/bio/schooldata',{headers:header})  
        .map((response:SchoolInfo)=> <SchoolInfo>response)
      }
            //END

        //Email Data operations
            //BEGIN
      SaveEmailData(params:EmailInfo):Observable<string>{
        let body = {
            params
        }
       return this.http.post(this.storageService.BaseNodeUrl + '/bio/emailinfo',body)  
        .map((response:string)=> <string>response)    
      }


      ReadEmailData():Observable<EmailInfo>{
        let header = new HttpHeaders();
        header.append('Content-Type','application/json; charset=utf-8');
       return this.http.get(this.storageService.BaseNodeUrl + '/bio/emailinfo',{headers:header})  
        .map((response:EmailInfo)=> <EmailInfo>response)
      }
            //END

        //SMS Data operations
            //BEGIN
      SaveSMSData(params:SMSInfo):Observable<string>{
        let body = {
            params
        }
       return this.http.post(this.storageService.BaseNodeUrl + '/bio/smsinfo',body)  
        .map((response:string)=> <string>response)    
      }


      ReadSMSData():Observable<SMSInfo>{
        let header = new HttpHeaders();
        header.append('Content-Type','application/json; charset=utf-8');
       return this.http.get(this.storageService.BaseNodeUrl + '/bio/smsinfo',{headers:header})  
        .map((response:SMSInfo)=> <SMSInfo>response)
      }
            //END
}