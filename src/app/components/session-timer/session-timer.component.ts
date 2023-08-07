import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionTimerService } from 'src/app/services/session-timer/session-timer.service';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.css']
})
export class SessionTimerComponent implements OnInit,OnDestroy {

  private readonly CLASS_NAME = "SessionTimerComponent ";

  minutes: any;
  seconds: any;

  dialogShownOnce = false;

  //variable to hold session timer subscription
  sessionTimerSubscription : any;

  constructor( private sessionTimerService : SessionTimerService, private router : Router) { }

  ngOnInit() {
    this.startSessionTimer();
  }
  
  ngOnDestroy(): void {
    console.log(this.CLASS_NAME + "ngOnDestroy called.Unsubscribing sessiontimer");
    if(this.sessionTimerSubscription){
      this.sessionTimerSubscription.unsubscribe();
    }
  }

  public startSessionTimer() {
    console.log(this.CLASS_NAME + "startSessionTimer called");
    this.sessionTimerSubscription = this.sessionTimerService.getSessionTimer().subscribe((sessionTime: any) => {
      this.setSessionTime(sessionTime);
    },(complete: any) => {
      this.setSessionTime(null);
    },(error: any) => {
      this.setSessionTime(null);
    });
  }

  private setSessionTime(sessionTime : any){
    if(sessionTime){
      this.minutes = sessionTime.minutes;
      this.seconds = sessionTime.seconds;
    }else{
      if(!this.dialogShownOnce){
        let token = sessionStorage.getItem('token');
        if(token){
          alert("Session expired, please login again.");
          sessionStorage.removeItem('session_end');
          sessionStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      }
    }
  }
}
