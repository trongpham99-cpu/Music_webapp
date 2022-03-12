import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit {

  constructor(public audioSV: AudioService) { }

  ngOnInit(): void {
  }
  public getDetail(audioId: string){
    this.audioSV.getDetail(audioId).subscribe((res:any)=>{
      console.log(res);
    });
  }
}
