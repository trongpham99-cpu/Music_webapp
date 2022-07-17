import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Audio } from './../models/audio.model';
import { endPoint } from '../../environments/config';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(public http: HttpClient, public authSV: AuthService) { }

  public _audioId = new BehaviorSubject<any>(null);
  public _indexAudio = new BehaviorSubject<number>(0);

  public audios: Array<Audio> = [];

  public getPerfectSong(apiPath: string) {
    return this.http.get(endPoint + apiPath);
  }

  public getAudios() {
    return this.http.get(endPoint + `audio/getAll`);
  }

  public getSearch(songName: string) {
    return this.http.get(endPoint + `audio/getSearch?songName=${songName}`);
  }

  public getDetail(audioId: string) {
    return this.http.get(endPoint + `audio/getDetail/${audioId}`);
  }

  private header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authSV._token}`)
  }

  public postData(audioForm: any, file: any) {
    const formData: any = new FormData();
    formData.append('track', file)
    formData.append('songName', audioForm.songName)
    formData.append('authorId', audioForm.authorId)
    formData.append('category', audioForm.category)
    formData.append('photoURL', audioForm.photoURL)
    formData.append('liked', audioForm.liked)
    formData.append('listened', audioForm.listened)
    formData.append('sugesstion', audioForm.sugesstion)
    formData.append('authorCreate', audioForm.authorCreate)
    return this.http.post(endPoint + `audio/add`, formData, this.header);
  }

  public deleteAudio(audioId: string) {
    if (!this.authSV._token) {
      console.log(`chua co token`);
      return;
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authSV._token}`)
    }
    return this.http.delete(endPoint + `audio/deleteAll/${audioId}`, header);
  }

}
