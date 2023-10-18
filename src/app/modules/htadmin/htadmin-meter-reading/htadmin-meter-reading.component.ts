import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/services/location-service';
import { MeterService } from 'src/app/services/meter-service';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-meter-reading',
  templateUrl: './htadmin-meter-reading.component.html',
  styleUrls: ['./htadmin-meter-reading.component.css']
})
export class HtadminMeterReadingComponent implements OnInit{
  readonly categories = ["MAIN", "CHECK"];
  reading : any;
  loading : boolean = false;
  locations : any;
  category : string = "";
  meters : any = [];
  billMonth : any;
  previousReading : any;
  meter : any;

  constructor(private meterService : MeterService, private locationService : LocationService, private readService : ReadService){
  }

  ngOnInit(): void {
  }

  initialiseReading(){
    this.reading = { ereactiveQuad1 : 0, ereactiveQuad2 : 0, ereactiveQuad3 : 0, ereactiveQuad4 : 0};
  }

  getMetersByCategory(){
    this.meterService.getMetersByCategoryStatusAndIsMapped(this.category, "active", "yes").subscribe({next: success =>{
      this.meters = success;
    }, error : error => {
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  searchClicked(meter : any){ 
    this.loading = true;
    this.previousReading = undefined;
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.getLatestReadingByMeterNo(meter.meterNumber, month);
    this.initialiseReading();
    let nextMonth = new Date(this.billMonth).getMonth() + 1;
    this.reading.readingDate = new Date(this.billMonth).setMonth(nextMonth);
    
  }

  getLatestReadingByMeterNo(meterNo : string, month : string){
    this.readService.getLatestMeterReadingByMeterNo(meterNo, month).subscribe({next: (success : any) =>{
      this.loading = false;
      this.previousReading = success;
    }, error : (error) => {
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  onSubmit(f : NgForm){
    
    this.reading.meterNo = this.meter.meterNumber;
    this.reading.mf = this.meter.mf;

    console.log(this.reading);
    if(f.invalid){
      alert("Please fill all required fields.");
      return;
    }
    f.form.disable();
    this.readService.createReading(this.reading, true).subscribe({next : (success : any) =>{
      if(success?.status === 200){
        alert("Reading added Successfully.");
        this.previousReading = undefined;
        this.reading = undefined;
        f.resetForm();
        return;
      }
      alert("Unable to add read !");
      f.form.enable();
    }, error : error =>{
      f.form.enable();
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
