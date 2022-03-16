import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }
  
  // public userLogin(apiPath:String)
  // {
  //   this.http.post(environment.enpoint+apiPath,{
  //     "email":"huhu111@gmail.com",
  //     "password": "1234567899"
  //   })
  // }

  public _token = localStorage.getItem('_token')

  public _user = new BehaviorSubject<string>('');


  public userRegister(userForm: any){
    return this.http.post(environment.enpoint+'user/register', userForm);
  }

  public userLogin(userForm: any){
    return this.http.post(environment.enpoint+"user/login",userForm);
  }

  public getProfile(){
    if(!this._token) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }
    return this.http.get(environment.enpoint + "user/profileWToken", header);
  }
}
