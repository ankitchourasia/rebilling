import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AMRCellComponent } from './amrcell.component';
import { AMRCellHomeComponent } from './amrcell-home/amrcell-home.component';
import { AmrcellReadFileUploadComponent } from './amrcell-read-file-upload/amrcell-read-file-upload.component';
import { AMRCellDashboardComponent } from './amrcell-dashboard/amrcell-dashboard.component';
import { AMRCell5PercentReportForceAcceptComponent } from './amrcell5-percent-report-force-accept/amrcell5-percent-report-force-accept.component';
import { AMRCellReadHistoryComponent } from './amrcell-read-history/amrcell-read-history.component';
import { ViewReadBifurcationComponent } from 'src/app/components/view-read-bifurcation/view-read-bifurcation.component';
import { ViewInvoiceComponent } from 'src/app/components/view-invoice/view-invoice.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';

const amrCellRoutes: Routes = [
  {
    path: '', component: AMRCellComponent, canActivate: [],
    children: [
      {
        path: 'home', 
        component: AMRCellHomeComponent
      },
      {
        path: 'read-file-upload', 
        component: AmrcellReadFileUploadComponent
      },
      {
        path: 'report-5percent', 
        component: AMRCellDashboardComponent
      },
      {
        path: 'read-force-accept', 
        component: AMRCell5PercentReportForceAcceptComponent
      },
      {
        path: 'read-history', 
        component: AMRCellReadHistoryComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path : 'view-bifurcation',
        component: ViewReadBifurcationComponent
      },
      {
        path : 'view-invoice',
        component: ViewInvoiceComponent
      },
      {
        path : 'consumption-report',
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
    RouterModule.forChild(amrCellRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AMRCellRoutingModule { }