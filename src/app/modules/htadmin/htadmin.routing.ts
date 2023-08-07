import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTAdminComponent } from './htadmin.component';
import { HTAdminHomeComponent } from './htadmin-home/htadmin-home.component';
import { HTAdminMeterAddComponent } from './htadmin-meter-add/htadmin-meter-add.component';
import { HTAdminMeterViewComponent } from './htadmin-meter-view/htadmin-meter-view.component';
import { HTAdminFeederAddComponent } from './htadmin-feeder-add/htadmin-feeder-add.component';
import { HTAdminFeederViewComponent } from './htadmin-feeder-view/htadmin-feeder-view.component';
import { HTAdminDeveloperViewComponent } from './htadmin-developer-view/htadmin-developer-view.component';
import { HTAdminDeveloperAddComponent } from './htadmin-developer-add/htadmin-developer-add.component';
import { HTAdminInvestorAddComponent } from './htadmin-investor-add/htadmin-investor-add.component';
import { HTAdminInvestorViewComponent } from './htadmin-investor-view/htadmin-investor-view.component';
import { HTAdminPlantAddComponent } from './htadmin-plant-add/htadmin-plant-add.component';
import { HTAdminPlantViewComponent } from './htadmin-plant-view/htadmin-plant-view.component';
import { HTAdminMachineAddComponent } from './htadmin-machine-add/htadmin-machine-add.component';
import { HTAdminMachineViewComponent } from './htadmin-machine-view/htadmin-machine-view.component';

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
        path: 'feeder-add', 
        component: HTAdminFeederAddComponent
      },
      {
        path: 'feeder-view', 
        component: HTAdminFeederViewComponent
      },
      {
        path: 'developer-add', 
        component: HTAdminDeveloperAddComponent
      },
      {
        path: 'developer-view', 
        component: HTAdminDeveloperViewComponent
      },
      {
        path: 'investor-add', 
        component: HTAdminInvestorAddComponent
      },
      {
        path: 'investor-view', 
        component: HTAdminInvestorViewComponent
      },
      {
        path: 'plant-add', 
        component: HTAdminPlantAddComponent
      },
      {
        path: 'plant-view', 
        component: HTAdminPlantViewComponent
      },
      {
        path: 'machine-add', 
        component: HTAdminMachineAddComponent
      },
      {
        path: 'machine-view', 
        component: HTAdminMachineViewComponent
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