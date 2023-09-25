import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : '', 
    redirectTo : "login",
    pathMatch: 'full'
  },
  {
    path : 'login', 
    component : LoginComponent
  },
  {
    path: 'htadmin',
    loadChildren: () => import('src/app/modules/htadmin/htadmin.module').then(m => m.HTAdminModule)
  },
  {
    path: 'amrcell',
    loadChildren: () => import('src/app/modules/amrcell/amrcell.module').then(m => m.AMRCellModule)
  },
  {
    path: 'developer',
    loadChildren: () => import('src/app/modules/developer/developer.module').then(m => m.DeveloperModule)
  },
  { 
    path: '**', 
    redirectTo: '/login',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
