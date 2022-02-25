import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmMusicComponent } from './adm-music.component';

const routes: Routes = [{ path: '', component: AdmMusicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmMusicRoutingModule { }
