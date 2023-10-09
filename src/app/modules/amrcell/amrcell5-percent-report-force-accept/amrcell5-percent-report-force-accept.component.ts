import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-amrcell5-percent-report-force-accept',
  templateUrl: './amrcell5-percent-report-force-accept.component.html',
  styleUrls: ['./amrcell5-percent-report-force-accept.component.css']
})
export class AMRCell5PercentReportForceAcceptComponent implements OnInit {
  
  billMonth : any;
  loading : boolean = false;
  readings : any;
  readingsToApprove : any = [];

  constructor(private readService : ReadService){
  }

  ngOnInit(): void {
  }

  searchButtonClicked(){
    console.log(this.billMonth);
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.getFailedReadingByBillMonth(month);
    this.readingsToApprove = [];
  }

  getFailedReadingByBillMonth(billMonth : string){
    this.readService.getAMRFailedReadingsToForceApprove(billMonth).subscribe({next : success =>{
      this.readings = success;
      console.log(this.readings);
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  radioButtonClicked(reading : any, meterType : string){
    if(meterType === "Main"){
      reading.meterSelectedFlag = "main";
    } else if(meterType === "Check"){
      reading.meterSelectedFlag = "check";
    }
    if(this.readingsToApprove.findIndex((element : any) => element.id === reading.id) === -1){
      this.readingsToApprove.push(reading);
    }
  }

  forceAcceptClicked(){
    this.loading = true;
    this.readService.forceAcceptReading(this.readingsToApprove).subscribe({next : success =>{
      this.loading = false;
      alert("Approved Successfully.");
      this.searchButtonClicked();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
