import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';
import { DeveloperComponent } from './developer.component';
import { DeveloperValidateReadingComponent } from './developer-validate-reading/developer-validate-reading.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';
import { ViewReadBifurcationComponent } from 'src/app/components/view-read-bifurcation/view-read-bifurcation.component';
import { InvoiceGenerationComponent } from 'src/app/components/invoice-generation/invoice-generation.component';

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
        path: 'invoice-generation', 
        component: InvoiceGenerationComponent
      },
      {
        path : 'consumption-report',
        component: ConsumptionReportComponent
      },
      {
        path: 'view-bifurcation', 
        component: ViewReadBifurcationComponent
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