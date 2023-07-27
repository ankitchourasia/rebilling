import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionTimerComponent } from './session-timer.component';

@NgModule({
  imports: [
    CommonModule,
    //SessionTimerServiceModule //Injecting this service in app.module,to be available for whole app.
  ],
  declarations: [SessionTimerComponent],
  exports:[SessionTimerComponent]
})
export class SessionTimerModule { }
