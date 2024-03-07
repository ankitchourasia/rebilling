import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircleRoutingModule } from './circle-routing.module';
import { CircleComponent } from './circle.component';
import { CircleHomeComponent } from './circle-home/circle-home.component';
import { CircleVerifyInvoiceComponent } from './circle-verify-invoice/circle-verify-invoice.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { ViewReadBifurcationComponent } from "../../components/view-read-bifurcation/view-read-bifurcation.component";
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';


@NgModule({
    declarations: [
        CircleComponent,
        CircleHomeComponent,
        CircleVerifyInvoiceComponent
    ],
    imports: [
        CommonModule,
        CircleRoutingModule,
        NavbarModule,
        FormsModule,
        ViewReadBifurcationComponent,
        DashboardComponent
    ]
})
export class CircleModule { }
