import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleComponent } from './circle.component';
import { CircleHomeComponent } from './circle-home/circle-home.component';
import { CircleVerifyInvoiceComponent } from './circle-verify-invoice/circle-verify-invoice.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';
import { ViewReadBifurcationComponent } from 'src/app/components/view-read-bifurcation/view-read-bifurcation.component';

const routes: Routes = [
  {
    path: '', component: CircleComponent, canActivate: [],
    children: [
      {
        path: 'home', 
        component: CircleHomeComponent
      },
      {
        path: 'verify-invoice', 
        component: CircleVerifyInvoiceComponent
      },
      {
        path : 'consumption-report',
        component: ConsumptionReportComponent
      },
      {
        path : 'view-bifurcation',
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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CircleRoutingModule { }
