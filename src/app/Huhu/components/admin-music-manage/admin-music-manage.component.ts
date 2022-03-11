import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-music-manage',
  templateUrl: './admin-music-manage.component.html',
  styleUrls: ['./admin-music-manage.component.scss']
})
export class AdminMusicManageComponent implements OnInit {
  displayUpLoad: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  upload(){
    this.displayUpLoad = true;
  }
  

}
