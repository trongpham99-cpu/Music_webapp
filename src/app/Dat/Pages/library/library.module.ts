import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../shared/material.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { BodyLibraryComponent } from '../../Components/body-library/body-library.component';


@NgModule({
  declarations: [
    LibraryComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MaterialModule
  ]
})
export class LibraryModule { }
