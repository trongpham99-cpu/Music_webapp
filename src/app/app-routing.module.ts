import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./Dat/Pages/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
  { path: 'hotmusic', loadChildren: () => import('./Huy/pages/hot-music/hot-music.module').then(m => m.HotMusicModule) }, 
  { path: 'video', loadChildren: () => import('./Huy/pages/video/video.module').then(m => m.VideoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
