import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-amrcell-dashboard',
  templateUrl: './amrcell-dashboard.component.html',
  styleUrls: ['./amrcell-dashboard.component.css']
})
export class AMRCellDashboardComponent implements OnInit {
  
  billMonth! : string;
  loading : boolean = false;
  reports : any;
  constructor(private readingService : ReadService){
  }

  ngOnInit(): void {

  }

  searchClicked(){
    this.loading = true;
    this.reports = undefined;
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.readingService.get5PercentReportBybillMonth(month).subscribe({next : success =>{
      this.loading = false;
      this.reports = success;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  approveButtonClicked(){
    this.loading = true;
    this.readingService.approve5PercentReading(this.reports, true).subscribe({next : success =>{
      this.loading = false;
      alert("Aprroved");
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
