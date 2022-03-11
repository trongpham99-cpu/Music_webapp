import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayBasic: boolean = false;
    value3= String;
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.displayBasic = true;
  }


}
