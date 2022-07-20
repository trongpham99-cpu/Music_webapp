import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
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

  public updateAudio(audio: Audio) {
    if (!this.authSV._token) {
      return;
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authSV._token}`)
    }
    return this.http.put(endPoint + `audio/update`, audio, header);
  }

  public postData(audioForm: File, imageFile: File, audio: Audio) {

    if (!this.authSV._token) {
      return from(Promise.reject({
        message: "No token"
      }));
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authSV._token}`)
    }

    const formData: any = new FormData();
    formData.append('files', imageFile)
    formData.append('files', audioForm)
    formData.append('audioName', audio.audioName)
    formData.append('artistId', audio.artistId)
    formData.append('typeId', audio.typeId)

    console.log(formData)

    return this.http.post(endPoint + `audio/add-new`, formData, header);
  }

  public deleteAudio(audioId: string) {
    if (!this.authSV._token) {
      return;
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authSV._token}`)
    }
    return this.http.delete(endPoint + `audio/delete/${audioId}`, header);
  }

}
