import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { endPoint } from '../../environments/config'
import { GoogleAuthProvider, signInWithPopup, Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized = false;
  constructor(public http: HttpClient, private fAuth: Auth) {

  }

  public _token = localStorage.getItem('_token')

  public _user = new BehaviorSubject<string>('');

  public userRegister(userForm: any) {
    return this.http.post(endPoint + 'user/register', userForm);
  }

  public userLogin(userForm: any) {
    return this.http.post(endPoint + "user/login", userForm);
  }

  public getProfile() {
    if (!this._token) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }
    return this.http.get(endPoint + "user/profileWToken", header);
  }

  public getLibrary() {
    if (!this._token) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`),

    }
    return this.http.get(endPoint + "user/getLibrary", header);
  }

  public addLibrary(audioId: string) {
    console.log(audioId);
    if (!this._token) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`),

    }
    return this.http.put(endPoint + "user/addLibrary", { audioId: audioId }, header)
  }

  public async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(this.fAuth, provider);
    } catch (error) {
      return error;
    }
  }

}
