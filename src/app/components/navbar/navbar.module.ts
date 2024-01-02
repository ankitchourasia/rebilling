import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { SessionTimerModule } from '../session-timer/session-timer.module';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderNavbarComponent
  ],
  imports: [
    CommonModule,
    SessionTimerModule,
    ResetPasswordComponent,
    NgbModalModule
  ],
  exports: [
    HeaderNavbarComponent
  ]
})
export class NavbarModule { }
