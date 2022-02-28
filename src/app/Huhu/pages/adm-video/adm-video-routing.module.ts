import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmVideoComponent } from './adm-video.component';

const routes: Routes = [{ path: '', component: AdmVideoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmVideoRoutingModule { }
