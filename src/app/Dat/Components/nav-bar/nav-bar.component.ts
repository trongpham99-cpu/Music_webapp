import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import {Audio} from '../../../models/audio.model.js'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayBasic: boolean = false;
  displayRegister:boolean = false;
    value3= String;
  
  constructor(public audioSV: AudioService) { }

  ngOnInit(): void {
  }

  public songName! :string;

  public getSearch(){
    this.audioSV.getSearch(this.songName).subscribe((res:any)=>{
      this.audioSV.audios = res;
    })
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
