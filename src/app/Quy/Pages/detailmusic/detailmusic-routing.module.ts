import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailmusicComponent } from './detailmusic.component';

const routes: Routes = [{ path: '', component: DetailmusicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailmusicRoutingModule { }
