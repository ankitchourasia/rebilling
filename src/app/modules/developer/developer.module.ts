import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { CanActivateAuthGuard } from 'src/app/guards/can-activate.authguard';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DeveloperRoutingModule } from './developer.routing';
import { DeveloperComponent } from './developer.component';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';
import { DeveloperValidateReadingComponent } from './developer-validate-reading/developer-validate-reading.component';
import { DeveloperInvoiceGenerationComponent } from './developer-invoice-generation/developer-invoice-generation.component';
import { ViewReadBifurcationComponent } from "../../components/view-read-bifurcation/view-read-bifurcation.component";



@NgModule({
    declarations: [
        DeveloperComponent,
        DeveloperHomeComponent,
        DeveloperValidateReadingComponent,
        DeveloperInvoiceGenerationComponent
    ],
    providers: [CanActivateAuthGuard],
    imports: [
        CommonModule,
        DeveloperRoutingModule,
        DirectiveModule,
        NavbarModule,
        FormsModule,
        NgbPaginationModule,
        ViewReadBifurcationComponent
    ]
})
export class DeveloperModule { }
