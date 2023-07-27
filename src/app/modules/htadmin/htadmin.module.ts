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



@NgModule({
  declarations: [
    HTAdminComponent,
    HTAdminHomeComponent,
    HTAdminMeterAddComponent,
    HTAdminMeterViewComponent
  ],
  imports: [
    CommonModule,
    HTAdminRoutingModule,
    DirectiveModule,
    NavbarModule,
    FormsModule
  ],
  providers: [CanActivateAuthGuard]
})
export class HTAdminModule { }
