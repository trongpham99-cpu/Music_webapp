import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Audio } from 'src/app/models/audio.model';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import Hls from 'hls.js';
import { Store } from '@ngrx/store';
import { AudioDetail, AudioListing } from 'src/states/audio.state';
import { Observable } from 'rxjs';
import * as audioAction from '../../../actions/audio.action';
@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss'],
})
export class MusicBarComponent implements OnInit {
  constructor(
    public audioSV: AudioService,
    private _AuthService: AuthService,
    private store: Store<{ audioDetail: AudioDetail, listingAudio: AudioListing }>
  ) {
    this.audioDetail$ = this.store.select(state => state.audioDetail);
    this.audioListing$ = this.store.select(state => state.listingAudio);
  }
  public _audio!: Audio;
  public isPlaying = false;
  public Audio = new Audio();
  public progress: any;
  public i = 0;
  public isLoop = false;
  public isPlay = false;
  public speak = 100;
  public songs: Array<Audio> = [];
  public isMute = false;

  public audioDetail$: Observable<AudioDetail>;
  public audioListing$: Observable<AudioListing>;

  ngOnInit(): void {
    this.store.dispatch(audioAction.audioDetail())

    this.audioSV._indexAudio.subscribe(index => this.i = index);

    this.audioSV.getPerfectSong('audio/getAll').subscribe(
      res => {
        this.songs = <Array<Audio>>res;
      });

    this.audioDetail$.subscribe(res => {
      if (res.isSuccess) {
        this._audio = res.audio;
        this.playSong(res.audio.path)
      }
    })

  }

  public durationTime() {
    if (!this.Audio) return;
    if (this.Audio.duration) {
      let progressPercent = Math.floor(
        (this.Audio.currentTime / this.Audio.duration) * 100
      );
      this.progress = progressPercent;
    }
  }
  public changeSong(actions: string) {
    if (actions == 'next') {
      this.i++;
    } else {
      this.i--;
    }
    if (this.songs[this.i] == undefined) {
      this.i = 0;
    }
    this._audio = this.songs[this.i];
    this.playSong(this.songs[this.i].path);
  }

  public playSong(path: string) {
    // if (this.isPlaying == false) {
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(path);
      hls.attachMedia(this.Audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.Audio.play();
      });
    }
    this.isPlay = true;
    this.Audio.addEventListener('timeupdate', (currentTime) => {
      if (this.Audio.duration == this.Audio.currentTime) {
        this.i++;
        let _audio = this.songs[this.i];
        this.audioSV._audioId.next(_audio._id)
        this.store.dispatch(audioAction.fetchAudioDetail({ id: _audio._id }))
        this.playSong(_audio.path);
      }
      this.durationTime();
    });
  }

  public PlayandPause() {
    if (this.isPlay == false) {
      this.isPlay = true;
      this.Audio.play();
    } else if (this.isPlay == true) {
      this.Audio.pause();
      this.isPlay = false;
    }
  }

  public loopSong() {
    this.isLoop = !this.isLoop;
    if (this.isLoop == true) {
      this.Audio.loop = this.isLoop;
      console.log("It's loop");
    }
  }

  public adjustVolume(e: any) {
    if (!this.Audio) return;
    this.speak = e.value;
    if (e.value == 0) {
      this.isMute = true;
    } else if (e.value > 0) {
      this.isMute = false;
    }

    this.Audio.volume = e.value / 100;
  }

  public muteVolume() {
    if (!this.Audio) return;

    if (this.isMute == false) {
      this.Audio.muted = true;
      this.isMute = true;
      console.log('Muted');
    } else if (this.isMute == true) {
      this.Audio.muted = false;
      this.isMute = false;
      console.log('unmuted');
    }
  }

  @ViewChild('process') processRef!: ElementRef;

  public _endTime = 0;
  public _currentTime = 0;
  public _time = 0;

  changeTime(event: any) {
    if (!this.Audio) return;
    let left = this.processRef.nativeElement.getBoundingClientRect().left;
    let right = this.processRef.nativeElement.getBoundingClientRect().right;
    let point = event.clientX;
    let percent = (point - left) / (right - left);
    let value = Math.floor(percent * 100);
    this.Audio.currentTime = (value * this.Audio.duration) / 100;
    this._endTime = parseFloat((this.Audio.duration / 60).toFixed(2));
    this.Audio.addEventListener('timeupdate', (currentTime) => {
      this._currentTime = Math.floor(
        (this.Audio.currentTime / this.Audio.duration) * 100
      );
      this._time = parseFloat((this.Audio.currentTime / 60).toFixed(2));
    });
  }

  _addLibrary(audioId: string) {
    if (!audioId) return;
    this._AuthService.addLibrary(audioId)?.subscribe((res: any) => console.log(res));
  }
}
