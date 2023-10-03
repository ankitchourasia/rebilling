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
  checked : boolean =  false;
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

  validateButtonClicked(){
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
    this.validateReading(readingsToApprove);
  }

  validateReading(readings : any){
    if(readings.length < 1){
      alert("please select readings to approve");
      return;
    }
    this.readService.validateAMRValidatedReadByHT(readings).subscribe({next : success =>{
      alert("Readings validated successfully");
      this.searchButtonClicked();
    }, error : error =>{
      alert("Unable to validate readings.");
    }});
  }

}
