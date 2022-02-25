import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailmusicRoutingModule } from './detailmusic-routing.module';
import { DetailmusicComponent } from './detailmusic.component';


@NgModule({
  declarations: [
    DetailmusicComponent
  ],
  imports: [
    CommonModule,
    DetailmusicRoutingModule
  ]
})
export class DetailmusicModule { }
