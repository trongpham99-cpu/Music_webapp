import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio.model'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist.model';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/models/type.model';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { percentage, Storage } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-music-manage',
  templateUrl: './admin-music-manage.component.html',
  styleUrls: ['./admin-music-manage.component.scss']
})
export class AdminMusicManageComponent implements OnInit {
  displayUpLoad: boolean = false;

  
  constructor(public audioSV: AudioService, public artistSV: ArtistService, public typeSv: TypeService, public storage: Storage) { }

  ngOnInit(): void {
    this.audioSV.getPerfectSong('audio/getAll').subscribe((res:any) => {
      this.audioSV.audios = res
    })
  }
  public audioForm = new FormGroup({
    songName: new FormControl(''),
    authorId: new FormControl(''),
    category: new FormControl(''),
  });
  public async postData(){
    
    let _path = await this.uploadImage(); 
    const _audio = {
      ...this.audioForm.value,
      photoURL:_path,
      datesubmit: Date.now().toString(),
      submmitted: 0,
      liked: 0,
      listened: 0,
      sugesstion: '',
      authorCreate: 'admin',
      

    }
    this.audioSV.postData(_audio, this.fileAudio).subscribe((res:any) => {
      window.location.reload()      
    })
  }
  file!: File
  fileAudio!: File
  uploadPercent!: any;
  public _name!: string;
 
  onSelect(event:any){
    this.file = event.target.files[0];
  }
  onSelectAudio(event:any){
    this.fileAudio = event.target.files[0];
  }

  async uploadImage(){
    return new Promise((resolve, reject) => {
      const _ext = this.file!.name.split('.').pop();
      const _id = Date.now().toString();
      const path = `images/${_id}.${_ext}`;
      if(this.file){
        try {
          const storageRef =  ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, this.file);
          this.uploadPercent = percentage(task).subscribe((value: any) => {
            if(value.snapshot.metadata != null){
              getDownloadURL(storageRef).then((url) => {
                if(url){
                  resolve(url);
                }
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
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

  public _deleteAudio(audioId:string){
    this.audioSV.deleteAudio(audioId)?.subscribe((res)=>{
      window.location.reload()      
    })
  }

}
