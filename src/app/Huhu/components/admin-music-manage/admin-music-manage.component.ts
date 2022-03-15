import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio.model'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist.model';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/models/type.model';
@Component({
  selector: 'app-admin-music-manage',
  templateUrl: './admin-music-manage.component.html',
  styleUrls: ['./admin-music-manage.component.scss']
})
export class AdminMusicManageComponent implements OnInit {
  displayUpLoad: boolean = false;

  
  constructor(public audioSV: AudioService, public artistSV: ArtistService, public typeSv: TypeService) { }

  ngOnInit(): void {
  }
  public audioForm = new FormGroup({
    songName: new FormControl(''),
    authorId: new FormControl(''),
  });
  public postData(){
    console.log(this.audioForm.value)
    this.audioSV.postData(this.audioForm.value).subscribe((res:any) => {
      console.log(res)

    })
  }

  public artists: Array<Artist> = [];
  public types: Array<Type> = [];
  upload(){
    this.displayUpLoad = true;
    this.artistSV.getAllArtist().subscribe((res:any) => {
      this.artists = res
      console.log(this.artists)
    })
    this.typeSv.getAllType().subscribe((res:any)=>{
      this.types = res;
      console.log(this.types);
    })
  }
  

}
