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
import { HTAdminValidateReadingComponent } from './htadmin-validate-reading/htadmin-validate-reading.component';
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';
import { ViewReadBifurcationComponent } from 'src/app/components/view-read-bifurcation/view-read-bifurcation.component';
import { ViewInvoiceComponent } from 'src/app/components/view-invoice/view-invoice.component';
import { HtadminMeterStartReadPunchComponent } from './htadmin-meter-start-read-punch/htadmin-meter-start-read-punch.component';
import { HTAdminThirdPartyAddComponent } from './htadmin-third-party-add/htadmin-third-party-add.component';
import { HTAdminThirdPartyViewComponent } from './htadmin-third-party-view/htadmin-third-party-view.component';
import { DownloadSolarStatementComponent } from 'src/app/components/download-solar-statement/download-solar-statement.component';
import { MeterReplacementComponent } from 'src/app/components/meter-replacement/meter-replacement.component';
import { HTAdminAddInvestorMachineMappingComponent } from './htadmin-add-investor-machine-mapping/htadmin-add-investor-machine-mapping.component';
import { HTAdminAddMeterFeederPlantMappingComponent } from './htadmin-add-meter-feeder-plant-mapping/htadmin-add-meter-feeder-plant-mapping.component';
import { HTAdminCompleteMappingViewComponent } from './htadmin-complete-mapping-view/htadmin-complete-mapping-view.component';
import { InvoiceGenerationComponent } from 'src/app/components/invoice-generation/invoice-generation.component';
import { Consumption5PercentViewComponent } from 'src/app/components/htadmin-read-view/consumption-5percent-view.component';
import { ReadHistoryComponent } from 'src/app/components/read-history/read-history.component';
import { CompleteMappingViewComponent } from 'src/app/components/complete-mapping-view/complete-mapping-view.component';
import { AbsentReadComponent } from 'src/app/components/absent-read/absent-read.component';
import { MeterReadingComponent } from 'src/app/components/meter-reading/meter-reading.component';

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
        path: 'reading-add', 
        component: MeterReadingComponent
      },
      {
        path: 'reading-validate', 
        component: HTAdminValidateReadingComponent
      },
      {
        path: 'reading-view', 
        component: Consumption5PercentViewComponent
      },
      {
        path: 'consumption-report', 
        component: ConsumptionReportComponent
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
        path : 'start-read-add',
        component: HtadminMeterStartReadPunchComponent
      },
      {
        path : 'add-third-party',
        component : HTAdminThirdPartyAddComponent
      },
      {
        path : 'view-third-party',
        component : HTAdminThirdPartyViewComponent
      },
      {
        path : 'download-solar-statement',
        component : DownloadSolarStatementComponent
      },
      {
        path : 'meter-replacement',
        component : MeterReplacementComponent
      },
      {
        path : 'investor-machine-mapping-add',
        component : HTAdminAddInvestorMachineMappingComponent
      },
      {
        path : 'meter-feeder-plant-mapping-add',
        component : HTAdminAddMeterFeederPlantMappingComponent
      },
      {
        path : 'complete-mapping-view',
        component : CompleteMappingViewComponent
      },
      {
        path : 'view-meter-invoice',
        component : InvoiceGenerationComponent
      },
      {
        path : 'read-history',
        component : ReadHistoryComponent
      },
      {
        path : 'absent-read',
        component : AbsentReadComponent
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