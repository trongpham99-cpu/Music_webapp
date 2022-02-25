import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BodyComponent } from '../../../Dat/Components/body/body.component'
import { AdminMusicManageComponent } from '../../../Huhu/components/admin-music-manage/admin-music-manage.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: BodyComponent },
      { path: 'admin', component: AdminMusicManageComponent}
    ]
  }]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
