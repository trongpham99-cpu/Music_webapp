import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmMusicRoutingModule } from './adm-music-routing.module';
import { AdmMusicComponent } from './adm-music.component';
import { MaterialModule } from '../../../shared/material.module';
import { AdminMusicManageComponent } from '../../../Huhu/components/admin-music-manage/admin-music-manage.component';
import { AdminVideoManageComponent } from '../../../Huhu/components/admin-video-manage/admin-video-manage.component';
import {DialogModule} from 'primeng/dialog';
import {TreeSelectModule} from 'primeng/treeselect';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AdmMusicComponent,
    AdminMusicManageComponent,
    AdminVideoManageComponent
  ],
  imports: [
    CommonModule,
    AdmMusicRoutingModule,
    MaterialModule,
    DialogModule,
    TreeSelectModule,
    ReactiveFormsModule
  ]
})
export class AdmMusicModule { }
