import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotMusicRoutingModule } from './hot-music-routing.module';
import { HotMusicComponent } from './hot-music.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HotMusicComponent
  ],
  imports: [
    CommonModule,
    HotMusicRoutingModule,
    MatIconModule

  ]
})
export class HotMusicModule { }
