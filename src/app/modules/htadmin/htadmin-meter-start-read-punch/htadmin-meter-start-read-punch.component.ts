import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MeterService } from 'src/app/services/meter-service';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-meter-start-read-punch',
  templateUrl: './htadmin-meter-start-read-punch.component.html',
  styleUrls: ['./htadmin-meter-start-read-punch.component.css']
})
export class HtadminMeterStartReadPunchComponent implements OnInit {

  reading : any;
  loading : boolean = false;
  locations : any;
  meters : any = [];
  billMonth : any;
  meter : any;
  d : Date = new Date();

  constructor(private meterService : MeterService, private readService : ReadService){
  }

  ngOnInit(): void {
    this.getMeters();
    this.reading = { ereactiveQuad1 : 0, ereactiveQuad2 : 0, ereactiveQuad3 : 0, ereactiveQuad4 : 0};
  }

  getMeters(){
    this.meterService.getMeters().subscribe({next: success =>{
      this.meters = success;
    }, error : error => {
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  onSubmit(f : NgForm){
    this.reading.meterNo = this.reading.meter.meterNo;

    console.log(this.reading);
    if(f.invalid){
      alert("Please fill all required fields.");
      return;
    }
    f.form.disable();
    this.readService.createStartReading(this.reading, true).subscribe({next : (success : any) =>{
      if(success?.status === 200){
        alert("Start Read added Successfully.");
        this.reading = undefined;
        f.resetForm();
        return;
      }
      alert("Unable to add start read !");
      f.form.enable();
    }, error : error =>{
      f.form.enable();
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
