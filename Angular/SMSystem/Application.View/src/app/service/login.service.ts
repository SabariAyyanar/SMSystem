import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Register} from '../models/register';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import { ExternalService } from './external.service';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient,private storage:StorageService,private externalService:ExternalService) { 
    
  }

  login:Register = new Register(1,'','','','');

  BaseUrl: string = this.storage.BaseUrl;
  setCurrentUser (newUser:Register):void{
    this.login = newUser;
  }

  getCurrentUser(newUser:Register):Register{
    return this.login;
  }

  AddNewUser(params:Register){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/AppUser/AddUser',params,{headers:header})
    .subscribe(
      () => {},
      (err)=>{this.externalService.logError(err)}
    )
  }
    

  getUserInfo(params:Register){
   let data = 'grant_type=password' + '&username='+encodeURIComponent(params.username) + '&password='+encodeURIComponent(params.password)
    let header = new HttpHeaders();
    header.append(
      'Content-Type','application/x-www-form-urlencoded')
      header.append(
        'grant_type','password')
    return this._http.post(this.BaseUrl +'/token',data,{headers:header})
  }
}