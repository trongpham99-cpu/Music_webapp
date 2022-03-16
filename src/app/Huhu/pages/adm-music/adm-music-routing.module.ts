import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmMusicComponent } from './adm-music.component';
import { AdminMusicManageComponent } from '../../../Huhu/components/admin-music-manage/admin-music-manage.component';
import { AdminVideoManageComponent } from '../../components/admin-video-manage/admin-video-manage.component';
import { AdminArtistManageComponent } from '../../../Huhu/components/admin-artist-manage/admin-artist-manage.component';


const routes: Routes = [
  { 
    path: '', 
    component: AdmMusicComponent,
    children: [
      { path: 'music', component:  AdminMusicManageComponent},
      { path: 'video', component:  AdminVideoManageComponent},
      { path: 'artist', component: AdminArtistManageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmMusicRoutingModule { }
