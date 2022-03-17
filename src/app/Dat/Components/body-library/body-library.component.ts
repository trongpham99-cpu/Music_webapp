import { Component, OnInit } from '@angular/core';
import { Audio } from 'src/app/models/audio.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { AudioService } from '../../../services/audio.service';
@Component({
  selector: 'app-body-library',
  templateUrl: './body-library.component.html',
  styleUrls: ['./body-library.component.scss']
})
export class BodyLibraryComponent implements OnInit {

  public audios:Audio[] = []
  displayedColumns: string[] = ['name', 'artist', 'dateAdd', 'time'];
  constructor(
    private authSV:AuthService,
    private _AudioService:AudioService
  ) { }

  public user!:User
  ngOnInit(): void {
    this.authSV.getProfile()?.subscribe((res: any)=>{
      this.user = res;
    })
    this.authSV.getLibrary()?.subscribe((res:any)=>{
      this.audios = res;
      console.log(res)
    })
  }

  changeSong(audioId: string, i: number){
    this._AudioService._audioId.next(audioId);
    this._AudioService._indexAudio.next(i);
  }

}
