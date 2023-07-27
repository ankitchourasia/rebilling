import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTAdminComponent } from './htadmin.component';
import { HTAdminHomeComponent } from './htadmin-home/htadmin-home.component';
import { HTAdminMeterAddComponent } from './htadmin-meter-add/htadmin-meter-add.component';
import { HTAdminMeterViewComponent } from './htadmin-meter-view/htadmin-meter-view.component';

const htAdminRoutes: Routes = [
  {
    path: '', component: HTAdminComponent, canActivate: [],
    children: [
      {
        path: 'home', 
        component: HTAdminHomeComponent
      },
      {
        path: 'meter-add', 
        component: HTAdminMeterAddComponent
      },
      {
        path: 'meter-view', 
        component: HTAdminMeterViewComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(htAdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HTAdminRoutingModule { }