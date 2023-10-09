import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AMRCellComponent } from './amrcell.component';
import { AMRCellHomeComponent } from './amrcell-home/amrcell-home.component';
import { AmrcellReadFileUploadComponent } from './amrcell-read-file-upload/amrcell-read-file-upload.component';
import { AMRCellDashboardComponent } from './amrcell-dashboard/amrcell-dashboard.component';
import { AMRCell5PercentReportForceAcceptComponent } from './amrcell5-percent-report-force-accept/amrcell5-percent-report-force-accept.component';
import { AMRCellReadHistoryComponent } from './amrcell-read-history/amrcell-read-history.component';

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