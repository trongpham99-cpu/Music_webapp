import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./Dat/Pages/home/home.module').then(m => m.HomeModule) },
  { path: 'admin', loadChildren: () => import('./Huhu/pages/adm-music/adm-music.module').then(m => m.AdmMusicModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
