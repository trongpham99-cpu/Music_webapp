import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Audio } from 'src/app/models/audio.model';
import { AudioService } from '../../../services/audio.service'
@Component({
  selector: 'app-detailmusic',
  templateUrl: './detailmusic.component.html',
  styleUrls: ['./detailmusic.component.scss']
})
export class DetailmusicComponent implements OnInit {

  constructor(
    private _router: ActivatedRoute,
    private _AudioService:AudioService
  ) { }

  public _audio!: Audio;
  ngOnInit(): void {
    let audioId = this._router.snapshot.paramMap.get('audioId') || '';
    this._AudioService.getDetail(audioId).subscribe((res:any)=>{
      this._audio = res;
    })
  }

}
