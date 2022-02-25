import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'Detail', loadChildren: () => import('./Quy/Pages/detailmusic/detailmusic.module').then(m => m.DetailmusicModule) }, 
    { path: 'Profile', loadChildren: () => import('./Quy/Pages/profile/profile.module').then(m => m.ProfileModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
