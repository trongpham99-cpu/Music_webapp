import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(public http: HttpClient) { }
  public getPerfectSong(apiPath:String){
  return this.http.get(environment.enpoint+apiPath);
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
