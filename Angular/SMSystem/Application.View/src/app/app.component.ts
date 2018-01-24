import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  open:boolean = false;

  disLoading:boolean = this.loaderService.value;
  constructor(private loaderService:LoaderService){
    
    setInterval(()=>{this.disLoading = this.loaderService.value},500)
  }

  changeSideNavState(newSideNavState){
      this.open = newSideNavState;
  }
 
}
