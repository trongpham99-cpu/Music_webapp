import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BodyComponent } from 'src/app/Dat/Components/body/body.component';
import { KindOfMusicComponent } from 'src/app/Dat/Components/kind-of-music/kind-of-music.component';
import { MusicBarComponent } from 'src/app/Dat/Components/music-bar/music-bar.component';
import { NavBarComponent } from 'src/app/Dat/Components/nav-bar/nav-bar.component';
import { SideBarComponent } from 'src/app/Dat/Components/side-bar/side-bar.component';
import { MaterialModule } from '../../shared/material.module'
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    MainComponent,
    NavBarComponent,
    SideBarComponent,
    MusicBarComponent,
    BodyComponent,
    KindOfMusicComponent,
  ],
  imports: [
    ButtonModule,
    DialogModule,
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
