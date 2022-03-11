import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayBasic: boolean = false;
  displayRegister:boolean = false;
    value3= String;
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.displayRegister = false;
    this.displayBasic = true;
  }

  registration(){
    this.displayBasic = false;
    this.displayRegister = true;
  }

}
