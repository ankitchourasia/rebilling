import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-read-view',
  templateUrl: './htadmin-read-view.component.html',
  styleUrls: ['./htadmin-read-view.component.css']
})
export class HTAdminReadViewComponent implements OnInit {

  loading : boolean = false;
  type : string = "";
  billMonth! : string;
  readings : any;

  constructor(private readService : ReadService){
  }

  ngOnInit(): void {
  }

  searchButtonClicked(){
    this.loading = true;
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.readService.getReadByBillMonthAndStatus(month, this.type).subscribe({next : success =>{
      this.loading = false;
      this.readings = success;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
