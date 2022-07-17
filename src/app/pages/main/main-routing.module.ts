import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BodyComponent } from '../../components/body/body.component';
import { BodyLibraryComponent } from '../../components/body-library/body-library.component';
import { AuthGuard } from '../../guards/auth.guard'
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: BodyComponent },
      { path: 'library', canActivate: [AuthGuard], component: BodyLibraryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
