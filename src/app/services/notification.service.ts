import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  getUnReadNotifications(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/notification/unread", options);
  }

  updateNotification(id : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.put("/rebilling/notification/status/id/" + id, {}, options);
  }

  getAllNotificationsByDate(startDate : any, endDate : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/notification/list/from-date/" + startDate + "/to-date/" + endDate, options);
  }
}
