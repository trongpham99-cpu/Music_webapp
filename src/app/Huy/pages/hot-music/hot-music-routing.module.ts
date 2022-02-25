import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotMusicComponent } from './hot-music.component';

const routes: Routes = [{ path: '', component: HotMusicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotMusicRoutingModule { }
