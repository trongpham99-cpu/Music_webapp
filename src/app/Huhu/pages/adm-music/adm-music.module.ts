import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmMusicRoutingModule } from './adm-music-routing.module';
import { AdmMusicComponent } from './adm-music.component';
import {AdminMusicManageComponent} from '../../components/admin-music-manage/admin-music-manage.component';
import { AdminVideoManageComponent } from '../../components/admin-video-manage/admin-video-manage.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AdmMusicComponent,
    AdminMusicManageComponent,
    AdminVideoManageComponent
  ],
  imports: [
    CommonModule,
    AdmMusicRoutingModule,
    MatIconModule
  ]
})
export class AdmMusicModule { }
