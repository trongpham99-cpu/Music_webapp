import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Audio } from '../../../../../../models/audio.model';
import { Store } from '@ngrx/store';
import { AudioListing } from 'src/states/audio.state';
import * as audioAction from '../../../../../../../actions/audio.action'
@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
})
export class AudiosComponent implements OnInit {

  constructor(
    private store: Store<{ listingAudio:  AudioListing}>
  ) {
    this.audioListing$ = this.store.select(state => state.listingAudio);
  }

  public isFetching = false;
  ngOnInit(): void {
    this.store.dispatch(audioAction.fetchAudio());
    this.audioListing$.subscribe(
      res=>{
        if(res.isSuccess){
          this.audios = res.audios;
          this.isFetching = true;
          return;
        }
        this.isFetching = false;
      }
    )
  }

  public audios: Array<Audio> = [];
  public audioListing$: Observable<AudioListing>;
}
