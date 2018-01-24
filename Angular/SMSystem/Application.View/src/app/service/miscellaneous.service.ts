import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RequestOptions } from '@angular/http/src/base_request_options';
import {StorageService} from './storage.service';
import { ExternalService } from './external.service';
import { Book, BookType, Income, IncomeCategory, Expense, ExpenseCategory,
     Library, Hostel, Room } from '../models/miscellaneous';

@Injectable()
export class MiscellaneousService {

 
  constructor(private _http: HttpClient,private storageService:StorageService,
  private externalService:ExternalService) {
    this.loadPrerequisiteData();
   }
   
   BaseUrl:string = this.storageService.BaseUrl;
   private allbooks:Book[];
   private allbooktypes:BookType[];
   private allincomes:Income[];
   private allincomecategories:IncomeCategory[];
   private allexpense:Expense[];
   private allexpensecategories:ExpenseCategory[];
   private allhostels:Hostel[];
   private alltranports:Transport[];
   private alllibraries:Library[];
   private allrooms:Room[];


   private loadPrerequisiteData(){
  
    this.GetAllBook().subscribe((response)=>this.allbooks = response,
                                (error) => this.externalService.logError(error))
    
    this.GetAllBookType().subscribe((response)=>this.allbooktypes = response,
                                    (error) => this.externalService.logError(error))

    this.GetAllIncome().subscribe((response)=>this.allincomes = response,
                                (error) => this.externalService.logError(error))

    this.GetAllIncomeCategory().subscribe((response)=>this.allincomecategories = response,
                                          (error) => this.externalService.logError(error))

    this.GetAllExpense().subscribe((response)=>this.allexpense = response,
                                    (error) => this.externalService.logError(error))

    this.GetAllExpenseCategory().subscribe((response)=>this.allexpensecategories = response,
                                          (error) => this.externalService.logError(error))

    this.GetAllHostel().subscribe((response)=>this.allhostels = response,
                                          (error) => this.externalService.logError(error))

    this.GetAllTransport().subscribe((response)=>this.alltranports = response,
                                    (error) => this.externalService.logError(error))

    this.GetAllLibrary().subscribe((response)=>this.alllibraries = response,
                                    (error) => this.externalService.logError(error))
    
    this.GetAllBook().subscribe((response)=>this.allbooks = response,
    (error) => this.externalService.logError(error))

  }


    getAllBook():Book[]{    
    return this.allbooks;
    }

    getAllBookType():BookType[]{
    return this.allbooktypes;
    }

    getAllIncome():Income[]{
    return this.allincomes;
    }

    getAllIncomeCategory():IncomeCategory[]{    
        return this.allincomecategories;
        }
    
    getAllExpense():Expense[]{
    return this.allexpense;
    }
    
    getAllExpenseCategory():ExpenseCategory[]{
    return this.allexpensecategories;
    }

    getAllHostel():Hostel[]{    
        return this.allhostels;
    }
    
    getAllTransport():Transport[]{
    return this.alltranports;
    }
    
    getAllLibrary():Library[]{
    return this.alllibraries;
    }

    getAllRoom():Room[]{
      return this.allrooms;
      }
   
    GetAllRoom():Observable<Room[]>{
      return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllRoom")
      .map((response:Room[])=> <Room[]>response)
      
    }

  GetAllBook():Observable<Book[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllBook")
    .map((response:Book[])=> <Book[]>response)
    
  }

  GetAllBookType():Observable<BookType[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllBookType")
    .map((response:BookType[])=> <BookType[]>response)
    
  }

  GetAllIncome():Observable<Income[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllIncome")
    .map((response:Income[])=> <Income[]>response)
    
  }

  GetAllIncomeCategory():Observable<IncomeCategory[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllIncomeCategory")
    .map((response:IncomeCategory[])=> <IncomeCategory[]>response)
    
  }
  GetAllExpense():Observable<Expense[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllExpense")
    .map((response:Expense[])=> <Expense[]>response)
    
  }

  GetAllExpenseCategory():Observable<ExpenseCategory[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllExpenseCategory")
    .map((response:ExpenseCategory[])=> <ExpenseCategory[]>response)
    
  }

  GetAllHostel():Observable<Hostel[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllHostel")
    .map((response:Hostel[])=> <Hostel[]>response)
    
  }

  GetAllTransport():Observable<Transport[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllTransport")
    .map((response:Transport[])=> <Transport[]>response)
    
  }

  GetAllLibrary():Observable<Library[]>{
    return this._http.get(this.BaseUrl + "/api/Miscellaneous/GetAllLibrary")
    .map((response:Library[])=> <Library[]>response)
    
  }


  
  //CRUD Operation for Room
  AddNewRoom(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewRoom',params,{headers:header})
          .map((response:Book[])=> <Book[]>response)
          
  }

  UpdateOldRoom(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldRoom',params,{headers:header})
    .map((response:Book[])=> <Book[]>response)
    
  } 

  RemoveOldRoom(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldRoom',params,{headers:header})
    
  } 

  // End CRUD operation for Room


  //CRUD Operation for Book
  AddNewBook(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewBook',params,{headers:header})
          .map((response:Book[])=> <Book[]>response)
          
  }

  UpdateOldBook(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldBook',params,{headers:header})
    .map((response:Book[])=> <Book[]>response)
    
  } 

  RemoveOldBook(params:Book){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldBook',params,{headers:header})
    
  } 

  // End CRUD operation for Book

  //CRUD Operation for Book Type
  AddNewBookType(params:BookType){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewBookType',params,{headers:header})
          .map((response:BookType[])=> <BookType[]>response)
          
  }

  UpdateOldBookType(params:BookType){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldBookType',params,{headers:header})
    .map((response:BookType[])=> <BookType[]>response)
    
  } 

  RemoveOldBookType(params:BookType){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldBookType',params,{headers:header})
    
  } 

  // End CRUD operation for Book Type


  //CRUD Operation for Income
  AddNewIncome(params:Income){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewIncome',params,{headers:header})
          .map((response:Income[])=> <Income[]>response)
          
  }

  UpdateOldIncome(params:Income){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldIncome',params,{headers:header})
    .map((response:Income[])=> <Income[]>response)
    
  } 

  RemoveOldIncome(params:Income){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldIncome',params,{headers:header})
    
  } 

  // End CRUD operation for Income

  //CRUD Operation for Income Category
  AddNewIncomeCategory(params:IncomeCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewIncomeCategory',params,{headers:header})
          .map((response:IncomeCategory[])=> <IncomeCategory[]>response)
          
  }

  UpdateOldIncomeCategory(params:IncomeCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldIncomeCategory',params,{headers:header})
    .map((response:IncomeCategory[])=> <IncomeCategory[]>response)
    
  } 

  RemoveOldIncomeCategory(params:IncomeCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldIncomeCategory',params,{headers:header})
    
  } 

  // End CRUD operation for Income Category


  //CRUD Operation for Expense
  AddNewExpense(params:Expense){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewExpense',params,{headers:header})
          .map((response:Expense[])=> <Expense[]>response)
          
  }

  UpdateOldExpense(params:Expense){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldExpense',params,{headers:header})
    .map((response:Expense[])=> <Expense[]>response)
    
  } 

  RemoveOldExpense(params:Expense){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldExpense',params,{headers:header})
    
  } 

  // End CRUD operation for Expense

  //CRUD Operation for Expense Category
  AddNewExpenseCategory(params:ExpenseCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewExpenseCategory',params,{headers:header})
          .map((response:ExpenseCategory[])=> <ExpenseCategory[]>response)
          
  }

  UpdateOldExpenseCategory(params:ExpenseCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldExpenseCategory',params,{headers:header})
    .map((response:ExpenseCategory[])=> <ExpenseCategory[]>response)
    
  } 

  RemoveOldExpenseCategory(params:ExpenseCategory){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldExpenseCategory',params,{headers:header})
    
  } 

  // End CRUD operation for Expense 
  

  //CRUD Operation for Hostel
  AddNewHostel(params:Hostel){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewHostel',params,{headers:header})
          .map((response:Hostel[])=> <Hostel[]>response)
          
  }

  UpdateOldHostel(params:Hostel){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldHostel',params,{headers:header})
    .map((response:Hostel[])=> <Hostel[]>response)
    
  } 

  RemoveOldHostel(params:Hostel){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldHostel',params,{headers:header})
    
  } 

  // End CRUD operation for Hostel

  //CRUD Operation for Transport
  AddNewTransport(params:Transport){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewTransport',params,{headers:header})
          .map((response:Transport[])=> <Transport[]>response)
          
  }

  UpdateOldTransport(params:Transport){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldTransport',params,{headers:header})
    .map((response:Transport[])=> <Transport[]>response)
    
  } 

  RemoveOldTransport(params:Transport){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldTransport',params,{headers:header})
    
  } 

  // End CRUD operation for Transport

  //CRUD Operation for Library
  AddNewLibrary(params:Library){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/AddNewLibrary',params,{headers:header})
          .map((response:Library[])=> <Library[]>response)
          
  }

  UpdateOldLibrary(params:Library){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/UpdateOldLibrary',params,{headers:header})
    .map((response:Library[])=> <Library[]>response)
    
  } 

  RemoveOldLibrary(params:Library){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json; charset=utf-8');  
    return this._http.post(this.BaseUrl + '/api/Miscellaneous/RemoveOldLibrary',params,{headers:header})
    
  } 

  // End CRUD operation for Library

}
