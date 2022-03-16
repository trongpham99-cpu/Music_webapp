import { Component, OnInit } from '@angular/core';
import { on } from 'cluster';
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
  public isPlaying = false;
  public Audio = new Audio();
  public progress: any;
  public i = 0;
  public isLoop= false;

  public songs:any = [];

  ngOnInit(): void {
    this.audioSV._audioId.subscribe((_id: string) => {
      this.audioSV.getDetail(_id).subscribe((audio: any) => {
        this._audio = audio;
        if(audio){
          this.playSong(audio.path);
        }
      });
    })
    this.audioSV.getPerfectSong('audio/getAll').subscribe((res:any)=>{
      this.songs = res
    })
  }
  public getDetail(audioId: string) {
    this.audioSV.getDetail(audioId).subscribe((res: any) => {
      console.log(res);
    });
  }

  public durationTime() {
    if (this.Audio.duration) {
      let progressPercent = Math.floor(this.Audio.currentTime / this.Audio.duration * 100)
      // console.log(progressPercent)
      this.progress = progressPercent;
    }
  }
  public changeSong(actions: string) {
    if(actions == "next"){
      this.i++;
    }else{
      this.i--;
    }
    if(this.songs[this.i]==undefined) {
      this.i = 0
    }
    this._audio = this.songs[this.i];
    this.playSong(this.songs[this.i].path);
  }

  public playSong(path:string) {

    // if (this.isPlaying == false) {
      this.Audio.src = path;
      this.Audio.load();
      this.Audio.play();
      this.audio.volume = 0.2;
      this.isPlaying = true;
      this.Audio.addEventListener('timeupdate', (currentTime) => {
        //console.log(this.Audio.currentTime);
        this.durationTime();
      })
    // } else {
    //   this.isPlaying = false;
    //   this.Audio.pause();
    //   //this.Audio.currentTime;
    // }

  }

  public loopSong(){
    this.isLoop= !this.isLoop;
    if (this.isLoop == true){
      this.Audio.loop = this.isLoop;
      this.Audio.load();
      this.Audio.play();
      
    }
    
  }

}
