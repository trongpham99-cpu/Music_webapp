import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public authSV: AuthService) { }

  displayBasic!: boolean;

  ngOnInit(): void {

  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
