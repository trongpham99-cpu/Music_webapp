import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Audio } from './../models/audio.model';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(public http: HttpClient) { }

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
