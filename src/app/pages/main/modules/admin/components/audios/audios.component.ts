import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Audio } from '../../../../../../models/audio.model';
import { Store } from '@ngrx/store';
import { AudioListing } from 'src/states/audio.state';
import * as audioAction from '../../../../../../../actions/audio.action'
import { ConfirmationService, MessageService } from 'primeng/api';
import { AudioService } from '../../../../../../services/audio.service';
import { ArtistService } from '../../../../../../services/artist.service';
import { TypeService } from '../../../../../../services/type.service';
import { Artist } from 'src/app/models/artist.model';
import { Type } from 'src/app/models/type.model';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AudiosComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private MessageService: MessageService,
    private ArtistService: ArtistService,
    private TypeService: TypeService,
    private store: Store<{ listingAudio: AudioListing }>,
    private AudioService: AudioService
  ) {
    this.audioListing$ = this.store.select(state => state.listingAudio);
  }

  public isFetching = false;
  ngOnInit(): void {
    this.store.dispatch(audioAction.fetchAudio());
    this.audioListing$.subscribe(
      res => {
        if (res.isSuccess) {
          this.audios = res.audios;
          this.isFetching = true;
          return;
        }
        this.isFetching = false;
      }
    )
    this.ArtistService.getAllArtist().subscribe(res => this.artists = <Array<Artist>>res);
    this.TypeService.getAllType().subscribe(res => this.types = <Array<Type>>res);
  }

  confirmDelete(event: Event, audioName: string, id: string) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: `Bạn có chắc chắn xóa bài hát ${audioName} ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AudioService.deleteAudio(id)?.subscribe(res => {
          this.MessageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          this.store.dispatch(audioAction.fetchAudio())
        })
      },
      reject: () => {
        this.MessageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  public audios: Array<Audio> = [];
  public artists: Array<Artist> = [];
  public types: Array<Type> = [];
  public audioListing$: Observable<AudioListing>;

  public audio: Audio = {
    audioName: '',
    artistId: <Artist>{},
    authorCreated: <User>{},
    typeId: <Type>{},
    _id: '',
    liked: 0,
    listened: 0,
    path: '',
    photoURL: 'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg',
    status: ''
  };
  displayDetail: boolean = false;

  async detail(id: string) {

    this.audio = <Audio>await this.AudioService.getDetail(id).toPromise();
    this.displayDetail = true;
  }

  async save() {
    if (!this.audio) return;
    if (this.audio._id === '') {
      console.log(this.audio);
      this.createAudio();
    } else {
      this.AudioService.updateAudio(this.audio)?.subscribe(
        res => {
          this.store.dispatch(audioAction.fetchAudio())
          this.displayDetail = false;
        }
      )
    }

  }

  openCreate() {
    this.displayDetail = true;
    this.audio = {
      audioName: '',
      artistId: <Artist>{},
      authorCreated: <User>{},
      typeId: <Type>{},
      _id: '',
      liked: 0,
      listened: 0,
      path: '',
      photoURL: 'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg',
      status: ''
    };
  }

  public imageFile!: File;
  public audioFile!: File;

  onSelectImage(event: any) {
    event.target.files[0];
    console.log(event.target.files[0]);
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.audio.photoURL = <string>reader.result;

    reader.readAsDataURL(this.imageFile);

  }
  onSelectAudio(event: any) {
    event.target.files[0];
    this.audioFile = event.target.files[0];
  }

  createAudio() {
    if (!this.imageFile && !this.audioFile) return;
    console.log(this.audio);
    this.AudioService.postData(this.imageFile, this.audioFile, this.audio).subscribe(
      res => {
        this.store.dispatch(audioAction.fetchAudio())
        this.displayDetail = false;
      }
    )
  }

}
