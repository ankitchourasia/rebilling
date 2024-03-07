import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

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
    this.checkAll = false;
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
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }

  exportTableToExcel(tableID : any){
    let dataType = 'data:application/vnd.ms-excel';
    let fileName =  'reading';
    let htmltable = document.getElementById(tableID);
    if(htmltable){
      let tableHTML = htmltable.outerHTML;
      this.downloadByBlob(tableHTML, dataType, fileName, 'xls');
    }
  }

  downloadByBlob(content : any, dataType : any, fileName : string, extention : string){
    let file = new Blob(['\ufeff', content], {type: dataType});
    const fileURL = window.URL.createObjectURL(file);
    //window.open(fileURL, '_blank');
    //------------------OR----------------------
    let anchorElement = document.createElement("a");
    anchorElement.href = fileURL;
    anchorElement.download = fileName + "." + extention;
    anchorElement.click();
    anchorElement.remove();
  }
}
