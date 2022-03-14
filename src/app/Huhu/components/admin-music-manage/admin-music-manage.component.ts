import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio.model'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist.model';
@Component({
  selector: 'app-admin-music-manage',
  templateUrl: './admin-music-manage.component.html',
  styleUrls: ['./admin-music-manage.component.scss']
})
export class AdminMusicManageComponent implements OnInit {
  displayUpLoad: boolean = false;

  
  constructor(public audioSV: AudioService, public artistSV: ArtistService) { }

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
  upload(){
    this.displayUpLoad = true;
    this.artistSV.getAllArtist().subscribe((res:any) => {
      this.artists = res
      console.log(this.artists)
    })
  }
  

}
