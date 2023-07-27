import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

/**
 * Developed by Nitish on 21112017.
 * Understand thoroughly,completely before changing anything. Do consult hundred times before
 * making any change
 */
@Injectable()
export class SessionTimerService {

    private readonly CLASS_NAME = "SessionTimerService ";

    constructor() {
        //this.sessionEndTime = this.authorizationService.getSessionEndTime();
        console.log(this.CLASS_NAME + " constructor running");
    }

    private sessionTimerObservable$ : any;

    /**
     * Function which returns sessionTimer Observable in 
     * a singleton pattern
     */
    public getSessionTimer() {
        console.log(this.CLASS_NAME + "getSessionTimer called");

        //returning observable if it refer to any object
        if (this.sessionTimerObservable$){
            console.log(this.CLASS_NAME + "sessionTimerObservable$ found already.")
            return this.sessionTimerObservable$;
        }

        console.log(this.CLASS_NAME + "sessionTimerObservable$ is null. creating new Observable");
        this.sessionTimerObservable$ = new Observable(observer => {
            console.log(this.CLASS_NAME + "Creating observer");
            this.prepareSessionTimer(observer, this);
            setInterval(this.prepareSessionTimer, 1000, observer, this);
        });
        return this.sessionTimerObservable$;
    }

    private nullBroadcasted: boolean = false;

    public prepareSessionTimer(observer: any, _this: any) {
        let sessionEndTimestamp : any = sessionStorage.getItem('session_end');
        if (sessionEndTimestamp) {
            let currentTimestamp = new Date().getTime();
            let difference = sessionEndTimestamp - currentTimestamp;
            if (difference < 0) {
                let sessionEndTimestamp = sessionStorage.setItem('session_end', "");
                observer.next(null);
                this.nullBroadcasted = true;
            } else {
                let remainingTime = _this.getTimeRemaining(difference);
                observer.next(remainingTime);
                this.nullBroadcasted = false;
            }
        } else {
            //console.log("SessionEndTimestamp is null and nullbroadcasted is " + this.nullBroadcasted);
            //broadcasting null only first time
            /*if(!this.nullBroadcasted) {
                console.log("broadcasting null");
                observer.next(null);
                this.nullBroadcasted = true;
            }*/
            //console.log("broadcasting null");
            
            //bombarding with null broadcast
            observer.next(null);
        }
    }

    public getTimeRemaining(difference: any) {
        var t = difference;
        var s = Math.floor((t / 1000) % 60);
        var m = Math.floor((t / 1000 / 60) % 60);
        // var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        // var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var minutes = ('0' + m).slice(-2);
        var seconds = ('0' + s).slice(-2);
        return {
            'minutes': minutes,
            'seconds': seconds
        };
    }

}