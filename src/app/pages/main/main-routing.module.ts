import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BodyComponent } from '../../Dat/Components/body/body.component';
const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: '', component:  BodyComponent},
      { path: 'admin', loadChildren: () => import('../../Huhu/pages/adm-music/adm-music.module').then(m => m.AdmMusicModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
