import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';

@Component({
  selector: 'app-htadmin-validate-reading',
  templateUrl: './htadmin-validate-reading.component.html',
  styleUrls: ['./htadmin-validate-reading.component.css']
})
export class HTAdminValidateReadingComponent implements OnInit{
  
  loading : boolean = false;
  billMonth : any;
  readings : any;
  constructor(private readService : ReadService){

  }
  ngOnInit(): void {
  }

  searchButtonClicked(){
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.getAMRAcceptedReadByBillMonth(month);
  }

  getAMRAcceptedReadByBillMonth(billMonth : string){
    this.loading = true;
    this.readService.getAMRAcceptedReadByBillMonth(billMonth).subscribe({next : success =>{
      this.loading = false;
      this.readings = success;
      console.log(this.readings);
    }, error : error =>{
      this.loading = false;
      console.log(error);
    }});
  }
}
