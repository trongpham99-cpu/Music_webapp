import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'hotmusic', loadChildren: () => import('./Huy/pages/hot-music/hot-music.module').then(m => m.HotMusicModule) }, { path: 'video', loadChildren: () => import('./Huy/pages/video/video.module').then(m => m.VideoModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
