import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }
  
  public userLogin(apiPath:String)
  {
    this.http.post(environment.enpoint+apiPath,{
      "email":"huhu111@gmail.com",
      "password": "1234567899"
    })
  }

  public userRegister(userForm: any){
    return this.http.post(environment.enpoint+'user/register', userForm);
  }

}
