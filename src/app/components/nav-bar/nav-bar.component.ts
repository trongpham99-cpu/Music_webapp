import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Audio } from '../../models/audio.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { User } from 'src/app/models/user.model.js';
import { Observable } from 'rxjs';
import { AuthState, Register } from 'src/states/auth.state';
import { Store } from '@ngrx/store';
import * as authAction from '../../../actions/auth.action';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [MessageService],
})
export class NavBarComponent implements OnInit {
  public user!: User;
  displayBasic: boolean = false;
  displayRegister: boolean = false;

  public authState$: Observable<AuthState>;
  public register$: Observable<Register>

  registerForm = new FormGroup({
    password: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public audioSV: AudioService,
    public messageService: MessageService,
    private store: Store<{ authLogin: AuthState, register: Register }>
  ) {
    this.authState$ = this.store.select((state) => state.authLogin);
    this.register$ = this.store.select((state) => state.register);
  }
  public err!: string;
  ngOnInit(): void {
    this.auth._user$.subscribe((token) => {
      if (token) {
        this.auth._token = token;
      }
      this.auth.getProfile()?.subscribe((res) => {
        this.user = <User>res;
        console.log(res)
      });
    });
    this.authState$.subscribe((res) => {
      console.log(res)
      if (res.error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.error,
        });
        return;
      }
      if (res.isLogin) {
        localStorage.setItem('_token', res.token);
        this.auth._user$.next(res.token)
        this.auth._token = res.token;
        this.auth.getProfile()?.subscribe((res) => {
          console.log(res);
          this.user = <User>res;
        });
      }
    });
    this.register$.subscribe(
      res => {
        console.log(res)
      }
    )
  }

  public songName!: string;

  public getSearch() {
    this.audioSV.getSearch(this.songName).subscribe((res: any) => {
      this.audioSV.audios = res;
    });
  }

  async loginWithGoogle() {
    try {
      const user = await this.auth.loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  login() {
    this.displayRegister = false;
    this.displayBasic = true;
  }

  registration() {
    this.displayBasic = false;
    this.displayRegister = true;
  }

  public onRegister() {
    this.store.dispatch(authAction.register({ registerForm: this.registerForm.value }))
  }

  public onLogin() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) return;
    this.store.dispatch(
      authAction.authLogin({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
    );
  }

  public onLogout() {
    localStorage.removeItem('_token');
    window.location.reload();
  }
}
