import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BodyComponent } from 'src/app/components/body/body.component';
import { KindOfMusicComponent } from '../../components/kind-of-music/kind-of-music.component';
import { MusicBarComponent } from '../../components/music-bar/music-bar.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MaterialModule } from '../../shared/material.module'
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BodyLibraryComponent } from '../../components/body-library/body-library.component';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    MainComponent,
    NavBarComponent,
    SideBarComponent,
    MusicBarComponent,
    BodyComponent,
    KindOfMusicComponent,
    BodyLibraryComponent
  ],
  imports: [
    DropdownModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    ToastModule
  ]
})
export class MainModule { }
