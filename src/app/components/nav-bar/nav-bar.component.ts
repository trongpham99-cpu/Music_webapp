import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Audio } from '../../models/audio.model'
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms'
import { AudioService } from '../../services/audio.service';
import { User } from 'src/app/models/user.model.js';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public user!: User;
  displayBasic: boolean = false;
  displayRegister: boolean = false;
  value3 = String;
  registerForm = new FormGroup({
    account: new FormControl(''),
    password: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl('')
  });

  loginForm = new FormGroup({
    account: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public audioSV: AudioService
  ) {

  }
  public err!: string;
  ngOnInit(): void {
    // if(this.auth._token){
    //   this.auth.getProfile()?.subscribe((res:any)=>{
    //     console.log(res);
    //     this.user = res;
    //   })
    // }
    this.auth._user.subscribe((token) => {
      // console.log(token)
      if (token) {
        this.auth._token = token
      }
      this.auth.getProfile()?.subscribe((res: any) => {
        // console.log(res);
        this.user = res;
      })
    })
  }

  public songName!: string;

  public getSearch() {
    this.audioSV.getSearch(this.songName).subscribe((res: any) => {
      this.audioSV.audios = res;
    })
  }

  async loginWithGoogle() {
    const user = await this.auth.loginWithGoogle();
    console.log(user);
  }

  login() {
    this.displayRegister = false;
    this.displayBasic = true;
    this._err = ''
  }

  registration() {
    this.displayBasic = false;
    this.displayRegister = true;
    this._err = ''
  }
  public _err!: string;
  public onRegister() {
    this.auth.userRegister(this.registerForm.value).subscribe((res) => {
      console.log(res);
      window.location.reload();
    }, (err) => {
      console.log(err)
      this.err = err.error.text
    })
  }

  public onLogin() {
    this.auth.userLogin(this.loginForm.value).subscribe((res: any) => {
      this.displayBasic = false;
      localStorage.setItem('_token', res.token);
      this.auth._user.next(res.token)
      //  window.location.reload();
      this._err = ''
    }, (err) => {
      console.log(err)
      this._err = err.error.message;
    })
  }

  public onLogout() {
    localStorage.removeItem('_token');
    window.location.reload();
  }

}

