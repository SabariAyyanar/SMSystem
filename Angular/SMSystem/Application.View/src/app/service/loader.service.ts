import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient } from "selenium-webdriver/http";
import { HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";

@Injectable()
export class LoaderService{

    public value:boolean;

  
    displayLoading(){
        this.value = true;
      }
    
      dismissLoading(){
        this.value = false;
      }
}