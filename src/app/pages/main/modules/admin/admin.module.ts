import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { AudiosComponent } from './components/audios/audios.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MaterialModule } from '../../../../shared/material.module'
import {MegaMenuModule} from 'primeng/megamenu';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AudiosComponent,
    ArtistsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    MegaMenuModule,
    ButtonModule,
    TagModule,
    MaterialModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    FormsModule,
    ToolbarModule
  ]
})
export class AdminModule { }
