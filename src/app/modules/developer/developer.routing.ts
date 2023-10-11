import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';
import { DeveloperComponent } from './developer.component';
import { DeveloperValidateReadingComponent } from './developer-validate-reading/developer-validate-reading.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';

const developerRoutes: Routes = [
  {
    path: '', component: DeveloperComponent, canActivate: [],
    children: [
      {
        path: 'home', 
        component: DeveloperHomeComponent
      },
      {
        path: 'read-validate', 
        component: DeveloperValidateReadingComponent
      },
      {
        path: 'read-bifurcation', 
        component: ConsumptionReportComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(developerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DeveloperRoutingModule { }