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
  public postData(audioType: any){
    const _type = {
      data: audioType
    }
    return this.http.post(environment.enpoint+ `type/add`, _type);
  }
}
