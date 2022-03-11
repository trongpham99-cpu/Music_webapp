import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import {Audio} from '../../../models/audio.model'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public audios:Array<Audio> = [] ;
  constructor(public audioSV: AudioService,  ) {
    // this.get("audio/getAll")
   }

  ngOnInit(): void {
    this.audioSV.getPerfectSong('audio/getAll').subscribe((res: any)=>{
      this.audios = res;
      console.log(this.audios)
    })
  }
  // public async get(apiPath:String){
  //   let result;
  //   await (await this.audioSV.getPerfectSong(apiPath)).subscribe(value=>console.log(value))
  //   while(result==undefined){
  //     return result;
  //   }
  //   return;
  // }
  

}
