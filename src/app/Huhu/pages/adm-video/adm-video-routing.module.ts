import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVideoManageComponent } from '../../components/admin-video-manage/admin-video-manage.component';
import { AdmVideoComponent } from './adm-video.component';

const routes: Routes = [{ path: '', component: AdmVideoComponent,
// children: [
//    { path: 'video', component:  AdminVideoManageComponent}
// ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmVideoRoutingModule { }
