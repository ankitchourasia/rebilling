import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { CanActivateAuthGuard } from 'src/app/guards/can-activate.authguard';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AMRCellComponent } from './amrcell.component';
import { AMRCellRoutingModule } from './amrcell.routing';
import { AMRCellHomeComponent } from './amrcell-home/amrcell-home.component';
import { AmrcellReadFileUploadComponent } from './amrcell-read-file-upload/amrcell-read-file-upload.component';
import { AMRCellDashboardComponent } from './amrcell-dashboard/amrcell-dashboard.component';
import { AMRCell5PercentReportForceAcceptComponent } from './amrcell5-percent-report-force-accept/amrcell5-percent-report-force-accept.component';



@NgModule({
  declarations: [
    AMRCellComponent,
    AMRCellHomeComponent,
    AmrcellReadFileUploadComponent,
    AMRCellDashboardComponent,
    AMRCell5PercentReportForceAcceptComponent
  ],
  imports: [
    CommonModule,
    AMRCellRoutingModule,
    DirectiveModule,
    NavbarModule,
    FormsModule,
    NgbPaginationModule
  ],
  providers: [CanActivateAuthGuard]
})
export class AMRCellModule { }
