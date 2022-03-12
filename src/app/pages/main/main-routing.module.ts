import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BodyComponent } from '../../Dat/Components/body/body.component';
import { ThanhtoanComponent } from 'src/app/Huy/components/thanhtoan/thanhtoan.component';
import { BodyLibraryComponent } from '../../Dat/Components/body-library/body-library.component';
const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: '', component:  BodyComponent},
      { path: 'admin', loadChildren: () => import('../../Huhu/pages/adm-music/adm-music.module').then(m => m.AdmMusicModule) },
      { path: 'hotmusic', loadChildren: () => import('../../Huy/pages/hot-music/hot-music.module').then(m => m.HotMusicModule) }, 
      { path: 'video', loadChildren: () => import('../../Huy/pages/video/video.module').then(m => m.VideoModule) },
      { path: 'detailmusic', loadChildren: () => import('../../Quy/Pages/detailmusic/detailmusic.module').then(m => m.DetailmusicModule) }, 
      { path: 'profile', loadChildren: () => import('../../Quy/Pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'thanhtoan', component: ThanhtoanComponent },
      { path: 'library', component:  BodyLibraryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
