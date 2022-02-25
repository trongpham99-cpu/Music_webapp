 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BodyComponent } from '../../Components/body/body.component';
import { KindOfMusicComponent } from '../../Components/kind-of-music/kind-of-music.component';
import { MusicBarComponent } from '../../Components/music-bar/music-bar.component';
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../Components/side-bar/side-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    MusicBarComponent,
    BodyComponent,
    KindOfMusicComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HomeModule { }
