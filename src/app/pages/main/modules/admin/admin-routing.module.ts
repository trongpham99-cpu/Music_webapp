import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AudiosComponent } from './components/audios/audios.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'artists', component: ArtistsComponent
      },
      {
        path: 'audios', component: AudiosComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
