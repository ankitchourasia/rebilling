import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { SessionTimerModule } from '../session-timer/session-timer.module';



@NgModule({
  declarations: [
    HeaderNavbarComponent
  ],
  imports: [
    CommonModule,
    SessionTimerModule
  ],
  exports: [
    HeaderNavbarComponent
  ]
})
export class NavbarModule { }
