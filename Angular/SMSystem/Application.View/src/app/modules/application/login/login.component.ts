import { Component, OnInit } from '@angular/core';
import {Register} from '../../../models/register';
import { EmployeeserviceService } from '../../../service/employee.service.service';
import {LoginService} from '../../../service/login.service';
import {Router,CanActivate, ActivatedRoute } from '@angular/router';
import {MatSnackBar,MatSnackBarConfig,MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} 
from '@angular/material';
import { LoaderService } from '../../../service/loader.service';
import { ExternalService } from '../../../service/external.service';
import { MailData, SchoolInfo } from '../../../models/external';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  employees: Register[];
  returnUrl:string;
  constructor(public matSnackBar:MatSnackBar,private employeeService: EmployeeserviceService,
    private router:Router,private route:ActivatedRoute,private loginService: LoginService,
    private loaderService:LoaderService,private externalService:ExternalService) { 
  }

  ngOnInit() {    
        this.loaderService.displayLoading();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/application/dashboard';
        if(localStorage.getItem('access_token')){
        if(localStorage.getItem('access_token').length > 0){
          this.router.navigateByUrl(this.returnUrl);
        }
      }
  }

  ngAfterContentInit(){    

  this.loaderService.dismissLoading();

  }
  confirmpassword:string = "";

  newHero() {
    this.model = new Register(42, '', '','');
    this.confirmpassword = '';
  }

powers = ['Admin', 'Staff',
  'Teacher', 'Student'];


login = new Register(1,'','','','');
model = new Register(2, '', '', '','');

submitted = false;

onSubmit() { 
  this.submitted = true; 
}

onRegisterSave(){
  this.loginService.AddNewUser(this.model);
  this.model = new Register(42, '', '','');
}

// to check correctness of input fields
get diagnostic() { return JSON.stringify(this.model); }


verticalposition:MatSnackBarVerticalPosition = 'top';
horizontalposition:MatSnackBarHorizontalPosition = 'right';

onLogin(){
  this.loaderService.displayLoading();
  this.loginService.getUserInfo(this.login)
  .subscribe(
    (response) => {localStorage.setItem('access_token',response['access_token']); 
    this.loaderService.dismissLoading();
    this.router.navigateByUrl(this.returnUrl);},
    err => { let config = new MatSnackBarConfig(); 
      config.horizontalPosition = this.horizontalposition;
      config.verticalPosition = this.verticalposition;
      this.externalService.logError(err);
      this.matSnackBar.open("Sorry. Login Failed","Got It",config); 
      setTimeout(() => this.matSnackBar.dismiss(),2000)
      this.loaderService.dismissLoading();
    }
  );
}
}

