import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class Interceptor implements HttpInterceptor{

    constructor(){

    }

  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
    if(localStorage.getItem('access_token')){
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('access_token')
        )
      })
      
      return next.handle(cloned).do(
        succ => {},
        err => {localStorage.setItem('access_token','');}
      );
      
    }
    else{
            return next.handle(req);
    }
    
  }

}
