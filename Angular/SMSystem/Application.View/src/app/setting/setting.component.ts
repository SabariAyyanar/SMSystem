import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  constructor(private loaderService:LoaderService) { 

  }

  ngOnInit() {
    this.loaderService.displayLoading();
  }

  ngAfterContentInit(){    
    
    this.loaderService.dismissLoading();
      }

}


