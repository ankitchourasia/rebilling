import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';

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
      console.log(error);
    }});
  }

  checkClicked(read : any){

  }

  checkAllClicked(){}

}
