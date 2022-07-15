import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from '../../models/audio.model'
import { Store } from '@ngrx/store';
import * as audioAction from '../../../actions/audio.action';
import { AudioDetail, AudioListing } from '../../../states/audio.state'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  constructor(
    public audioSV: AudioService,
    private store: Store<{ listingAudio: AudioListing, audioDetail: AudioDetail }>
  ) {
    this.audioListing$ = this.store.select(state => state.listingAudio);
  }
  public audioListing$: Observable<AudioListing>;
  public audios: Array<Audio> = [];
  public isSuccess = false;
  ngOnInit(): void {

    this.store.dispatch(audioAction.fetchAudio());

    this.audioListing$.subscribe(res => {
      if (res.isSuccess) {
        for (let i = 0; i < res.audios.length; i++) {
          this.audios.push(res.audios[i]);
        }
      }
      this.isSuccess = res.isSuccess;
    })
  }

  public getDetail(audioId: string, index: number) {
    this.audioSV._audioId.next(audioId);
    this.audioSV._indexAudio.next(index)
    this.store.dispatch(audioAction.fetchAudioDetail({ id: audioId }));

  }

}
