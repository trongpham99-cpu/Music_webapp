import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Audio} from '../../../models/audio.model.js'
import { AuthService } from 'src/app/services/auth.service';
import {ReactiveFormsModule,FormControl,FormGroup} from '@angular/forms'
import { AudioService } from '../../../services/audio.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayBasic: boolean = false;
  displayRegister:boolean = false;
    value3= String;
    registerForm = new FormGroup({
      password: new FormControl(''),
      email: new FormControl('')
    });

  constructor(
    public http:HttpClient,
    public auth:AuthService,
    public audioSV:AudioService
    ) { }

  ngOnInit(): void {
  }

  public songName! :string;

  public getSearch(){
    this.audioSV.getSearch(this.songName).subscribe((res:any)=>{
      this.audioSV.audios = res;
    })
  }

  login() {
    this.displayRegister = false;
    this.displayBasic = true;
  }

  registration(){
    this.displayBasic = false;
    this.displayRegister = true;
  }
  public err!: string;
  public onRegister(){
    this.auth.userRegister(this.registerForm.value).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err)
      this.err = err.error.text
      console.log(this.err)
    })
  }

}
