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



@NgModule({
  declarations: [
    DeveloperComponent,
    DeveloperHomeComponent,
    DeveloperValidateReadingComponent
  ],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    DirectiveModule,
    NavbarModule,
    FormsModule,
    NgbPaginationModule
  ],
  providers: [CanActivateAuthGuard]
})
export class DeveloperModule { }
