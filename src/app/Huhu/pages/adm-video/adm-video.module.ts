import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmVideoRoutingModule } from './adm-video-routing.module';
import { AdmVideoComponent } from './adm-video.component';


@NgModule({
  declarations: [
    AdmVideoComponent
  ],
  imports: [
    CommonModule,
    AdmVideoRoutingModule
  ]
})
export class AdmVideoModule { }
