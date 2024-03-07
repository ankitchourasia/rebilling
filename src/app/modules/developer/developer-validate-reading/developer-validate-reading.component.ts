import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-developer-validate-reading',
  templateUrl: './developer-validate-reading.component.html',
  styleUrls: ['./developer-validate-reading.component.css']
})
export class DeveloperValidateReadingComponent implements OnInit{
  
  readings : any;
  billMonth : string = "";
  loading : boolean = false;

  constructor(private readService : ReadService){
  }

  ngOnInit(): void {
  }

  searchButtonClicked(){
    this.checkAll = false;
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.getReadingsToApprove(month);
  }

  getReadingsToApprove(billMonth : string){
    this.loading = true;
    this.readService.getReadToApproveForDeveloper(billMonth).subscribe({ next : success =>{
      this.loading = false;
      this.readings = success;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }

  checkAll! : boolean;
  checkAllClicked(){
    this.readings.forEach((read : any) => {
      read.checked = this.checkAll;
    });
  }

  checkClicked(read : any){
    if(this.checkAll && !read.checked){
      this.checkAll = false;
    }
  }

  filterReadings() : any{
    let readingsToApprove = [];
    if(this.checkAll){
      readingsToApprove = this.readings;
    } else{
      this.readings.forEach((read : any) => {
        if(read.checked){
          readingsToApprove.push(read);
        }
      });
    }
    return readingsToApprove;
  }

  acceptRead(){
    let readings = this.filterReadings();
    this.readService.approveHTAcceptedRead(readings).subscribe({next : success =>{
      alert("Read accepted successfully");
      this.searchButtonClicked();
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }

  rejectRead(){
    let readings = this.filterReadings();
    if(readings.length < 1){
      alert("please select readings");
      return;
    }
    this.readService.rejectHTAcceptedRead(readings).subscribe({next : success =>{
      alert("Read rejected successfully");
      this.searchButtonClicked();
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }

}
