import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router) { }
  open:boolean = true;
  ngOnInit() {
  }

  @Output() changeSideNavState = new EventEmitter();

  toggleSideNav(){
    this.changeSideNavState.emit(this.open);
    this.open = !this.open;
  }

  logoutUser(){
    localStorage.setItem('access_token','');
    this.router.navigate(['/login']);
  }

}
