import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTAdminComponent } from './htadmin.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { HTAdminRoutingModule } from './htadmin.routing';
import { CanActivateAuthGuard } from 'src/app/guards/can-activate.authguard';
import { HTAdminHomeComponent } from './htadmin-home/htadmin-home.component';
import { HTAdminMeterAddComponent } from './htadmin-meter-add/htadmin-meter-add.component';
import { FormsModule } from '@angular/forms';
import { HTAdminMeterViewComponent } from './htadmin-meter-view/htadmin-meter-view.component';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { HTAdminFeederViewComponent } from './htadmin-feeder-view/htadmin-feeder-view.component';
import { HTAdminFeederAddComponent } from './htadmin-feeder-add/htadmin-feeder-add.component';
import { HTAdminDeveloperViewComponent } from './htadmin-developer-view/htadmin-developer-view.component';
import { HTAdminDeveloperAddComponent } from './htadmin-developer-add/htadmin-developer-add.component';
import { HTAdminInvestorAddComponent } from './htadmin-investor-add/htadmin-investor-add.component';
import { HTAdminInvestorViewComponent } from './htadmin-investor-view/htadmin-investor-view.component';
import { HTAdminPlantViewComponent } from './htadmin-plant-view/htadmin-plant-view.component';
import { HTAdminPlantAddComponent } from './htadmin-plant-add/htadmin-plant-add.component';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTAdminMachineViewComponent } from './htadmin-machine-view/htadmin-machine-view.component';
import { HTAdminMachineAddComponent } from './htadmin-machine-add/htadmin-machine-add.component';
import { HtadminMeterReadingComponent } from './htadmin-meter-reading/htadmin-meter-reading.component';
import { HTAdminValidateReadingComponent } from './htadmin-validate-reading/htadmin-validate-reading.component';
import { HTAdminReadViewComponent } from './htadmin-read-view/htadmin-read-view.component';
import { HTAdminReadHistoryComponent } from './htadmin-read-history/htadmin-read-history.component';
import { ReadHistoryComponent } from "../../components/read-history/read-history.component";
import { ConsumptionReportComponent } from 'src/app/components/consumption-report/consumption-report.component';
import { HtadminMeterStartReadPunchComponent } from './htadmin-meter-start-read-punch/htadmin-meter-start-read-punch.component';
import { HTAdminThirdPartyAddComponent } from './htadmin-third-party-add/htadmin-third-party-add.component';
import { HTAdminThirdPartyViewComponent } from './htadmin-third-party-view/htadmin-third-party-view.component';
import { SearchFilterPipe } from 'src/app/directives/search-filter.pipe';
import { DownloadSolarStatementComponent } from 'src/app/components/download-solar-statement/download-solar-statement.component';
import { HTAdminAddInvestorMachineMappingComponent } from './htadmin-add-investor-machine-mapping/htadmin-add-investor-machine-mapping.component';
import { HTAdminAddMeterFeederPlantMappingComponent } from './htadmin-add-meter-feeder-plant-mapping/htadmin-add-meter-feeder-plant-mapping.component';
import { HTAdminCompleteMappingViewComponent } from './htadmin-complete-mapping-view/htadmin-complete-mapping-view.component';

const GlobalComponents = [ ConsumptionReportComponent, SearchFilterPipe, DownloadSolarStatementComponent ]


@NgModule({
    declarations: [
        HTAdminComponent,
        HTAdminHomeComponent,
        HTAdminMeterAddComponent,
        HTAdminMeterViewComponent,
        HTAdminFeederAddComponent,
        HTAdminFeederViewComponent,
        HTAdminDeveloperViewComponent,
        HTAdminDeveloperAddComponent,
        HTAdminInvestorAddComponent,
        HTAdminInvestorViewComponent,
        HTAdminPlantViewComponent,
        HTAdminPlantAddComponent,
        HTAdminMachineViewComponent,
        HTAdminMachineAddComponent,
        HtadminMeterReadingComponent,
        HTAdminValidateReadingComponent,
        HTAdminReadViewComponent,
        HTAdminReadHistoryComponent,
        HtadminMeterStartReadPunchComponent,
        HTAdminThirdPartyAddComponent,
        HTAdminThirdPartyViewComponent,
        HTAdminAddInvestorMachineMappingComponent,
        HTAdminAddMeterFeederPlantMappingComponent,
        HTAdminCompleteMappingViewComponent
    ],
    providers: [CanActivateAuthGuard],
    imports: [
        CommonModule,
        HTAdminRoutingModule,
        DirectiveModule,
        NavbarModule,
        FormsModule,
        NgbPaginationModule,
        ReadHistoryComponent,
        NgbNavModule,
        GlobalComponents
    ]
})
export class HTAdminModule { }
