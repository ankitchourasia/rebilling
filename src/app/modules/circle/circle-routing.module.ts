import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleComponent } from './circle.component';
import { CircleHomeComponent } from './circle-home/circle-home.component';
import { CircleVerifyInvoiceComponent } from './circle-verify-invoice/circle-verify-invoice.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';
import { ViewReadBifurcationComponent } from 'src/app/components/view-read-bifurcation/view-read-bifurcation.component';
import { CompleteMappingViewComponent } from 'src/app/components/complete-mapping-view/complete-mapping-view.component';
import { DownloadSolarStatementComponent } from 'src/app/components/download-solar-statement/download-solar-statement.component';

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
        path: 'Complete-mapping-view', 
        component: CompleteMappingViewComponent
      },
      {
        path: 'download-solar-statement', 
        component: DownloadSolarStatementComponent
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
