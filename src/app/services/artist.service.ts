import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endPoint } from '../../environments/config';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(public http: HttpClient) { }

  public getAllArtist(){
    return this.http.get(endPoint + "artist/getAll")
  }
}
