import { Component, OnInit } from '@angular/core';
import { Audio } from 'src/app/models/audio.model';
import { AudioService } from 'src/app/services/audio.service';
@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit {

  constructor(public audioSV: AudioService) { }

  public _audio!: Audio

  private audio = new Audio();

  public isPlaying = true;
  public Audio = new Audio();

  ngOnInit(): void {
    this.audioSV._audioId.subscribe((_id: string)=>{
      this.audioSV.getDetail(_id).subscribe((audio:any)=>{
        this._audio = audio;
      });
    })
    this.playSong();
  }
  public getDetail(audioId: string){
    this.audioSV.getDetail(audioId).subscribe((res:any)=>{
      console.log(res);
    });
  }

  public playSong(){
  
  if (this.isPlaying==false){
  this.Audio.src = "../../../assets/musics/chungtacuahientai.mp3"
  this.Audio.load();
  this.Audio.play();
  this.isPlaying = true;
  } else {
    this.isPlaying = false;
    this.Audio.pause();
    //this.Audio.currentTime;
  }
  
  }
}
