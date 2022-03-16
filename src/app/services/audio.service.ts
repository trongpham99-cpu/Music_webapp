import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Audio } from './../models/audio.model';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(public http: HttpClient, public authSV:AuthService) { }

  public _audioId = new BehaviorSubject<string>('622c1005afffea551be1f76c');

  public audios: Array<Audio> = [];

  public getPerfectSong(apiPath: string){
    return this.http.get(environment.enpoint+apiPath);
  }

  public getSearch(songName: string){
    return this.http.get(environment.enpoint+ `audio/getSearch?songName=${songName}`);
  }

  public getDetail(audioId: string){
    return this.http.get(environment.enpoint+ `audio/getDetail/${audioId}`);
  }

  public postData(audioForm: any){
    const _audio = {
      data: audioForm
    }
    return this.http.post(environment.enpoint+ `audio/add`, _audio);
  }

  public deleteAudio(audioId: string){
    if(!this.authSV._token) {
      console.log(`chua co token`);
      return;
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authSV._token}`)
    }
    return this.http.delete(environment.enpoint+ `audio/deleteAll/${audioId}`, header);
  }

  // public async postData(songName: String, 
  //   authorId: string, 
  //   dateSubmit: String, 
  //   authorCreate: String, 
  //   path: String, 
  //   sugesstion: String, 
  //   photoURL: String, 
  //   category: String, 
  //   album: String, 
  //   submmitted: Number, 
  //   liked: Number, 
  //   listened: Number){
  //   let result = await this.http.post(environment.enpoint+'audio',{
  //     data: {songName:songName, 
  //       authorId: authorId,
  //       dateSubmit: dateSubmit,
  //       authorCreate: authorCreate,
  //       path: path,
  //       sugesstion: sugesstion,
  //       photoURL: photoURL,
  //       category: category,
  //       album: album,
  //       submmitted: submmitted,
  //       liked: liked,
  //       listened: listened
  //     }
  //   });
  //   return result;
  // }
}
