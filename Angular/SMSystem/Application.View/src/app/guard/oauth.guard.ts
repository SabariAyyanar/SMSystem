import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {StorageService} from '../service/storage.service';

@Injectable()
export class OauthGuard implements CanActivate {

  constructor(private storageservice: StorageService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
     
      if(!localStorage.getItem('access_token')){
        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
        return false;  
      }
      else if(localStorage.getItem('access_token').length > 0){
        return true;
      }
      else{
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
      }
  }
}
