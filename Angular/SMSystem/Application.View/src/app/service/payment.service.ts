import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from '../models/studentmodel';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import {Payment, PaymentHistory} from '../models/paymentmodel';
import { URLSearchParams } from '@angular/http/src/url_search_params';

@Injectable()
export class PaymentService {

 
  constructor(private _http: HttpClient,private storageService:StorageService) {
    
   }
   
   BaseUrl:string = this.storageService.BaseUrl;
   private paymenthistories:PaymentHistory[];


   getAllPaymentHistory():PaymentHistory[]{
    return this.paymenthistories;
  } 

  GetAllPaymentHistory():Observable<PaymentHistory[]>{
    return this._http.get(this.BaseUrl + "/api/Payment/GetAllPayment")
    .map((response:PaymentHistory[])=> <PaymentHistory[]>response)
  } 

  //CRUD Operations for payments

  GetStudentPaymentDetails(params:number):Observable<Payment>{
    return this._http.get(this.BaseUrl + "/api/Payment/GetStudentPaymentDetails/" + params)
    .map((response:Payment)=> <Payment>response)
  }
  
  AddPayment(newpaymenthistory:PaymentHistory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');
    return this._http.post(this.BaseUrl + '/api/Payment/AddPayment',newpaymenthistory,{headers:header})
  }

  UpdatePayment(paymenthistorytoupdate:any){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');
    return this._http.post(this.BaseUrl + '/api/Payment/UpdatePayment',paymenthistorytoupdate,{headers:header})
  }

  RemovePayment(paymenthistorytoremove:PaymentHistory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');
    return this._http.post(this.BaseUrl + '/api/Payment/RemovePayment',paymenthistorytoremove,{headers:header})
  }
}
