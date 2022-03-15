import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(public http: HttpClient) { }
  public getAllType(){
    return this.http.get(environment.enpoint + "type/getAll")
  }
}
