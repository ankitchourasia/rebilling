import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  type : string = "UNREAD";
  startDate : any;
  endDate : any;
  notifications : any;

  constructor(private notificationService : NotificationService){
  }

  ngOnInit(): void {
    this.getUnReadNotification();
  }

  searchButtonClicked(){
    if(this.type === "UNREAD"){
      this.getUnReadNotification();
    } else if(this.type === "ALL"){
      this.getAllNotificationByDate();
    }
  }

  getUnReadNotification(){
    this.notifications = [];
    this.notificationService.getUnReadNotifications().subscribe({next : success =>{
      this.notifications = success;
    }, error : error =>{
      console.log(error);
      // GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getAllNotificationByDate(){
    this.notifications = [];
    this.notificationService.getAllNotificationsByDate(this.startDate, this.endDate).subscribe({next : success =>{
      this.notifications = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  readMessageClicked(data : any){
    data.read = true;
    this.notificationService.updateNotification(data.id).subscribe({next : success =>{
      console.log(success);
    }, error : error =>{
      console.log(error);
    }})
  }

}
