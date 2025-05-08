import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MeterService } from 'src/app/services/meter-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { ReadService } from 'src/app/services/read-service';

@Component({
  selector: 'app-meter-replacement',
  standalone: true,
  imports: [CommonModule, NgbNavModule, FormsModule],
  templateUrl: './meter-replacement.component.html',
  styleUrls: ['./meter-replacement.component.css']
})
export class MeterReplacementComponent {
  active = 1;
  meters : any;
  oldMeterNo : any;
  oldMeter : any;
  newMeter : any;
  loading : boolean = false;
  previousReading : any;
  finalRead : any = {};
  startRead : any = {};


  constructor(private meterService : MeterService, private readService : ReadService){
  }

  initialiseReading(){
    this.finalRead = { ereactiveQuad1 : 0, ereactiveQuad2 : 0, ereactiveQuad3 : 0, ereactiveQuad4 : 0};
    this.startRead = { ereactiveQuad1 : 0, ereactiveQuad2 : 0, ereactiveQuad3 : 0, ereactiveQuad4 : 0};
  }

  getMetersforReplacement(){
    this.loading = true;
    this.meterService.getNewMetersForReplacement().subscribe({next: success =>{
      this.loading = false;
      this.meters = success;
    }, error : error => {
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getMeterForReplacementByMeterNo(){
    this.loading = true;
    this.meterService.getOldMetersForReplacementByMeterNo(this.oldMeterNo).subscribe({next: success =>{
      this.getMetersforReplacement(); 
      this.getLastReadByMeterNo();
      this.loading = false;
      this.oldMeter = success;
    }, error : error => {
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getLastReadByMeterNo(){
    this.loading = true;
    this.finalRead = {};
    this.readService.getLastMeterReadingforReplacementByMeterNo(this.oldMeterNo).subscribe({next : success =>{
      this.loading = false;
      this.previousReading = success;
      this.initialiseReading();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  changeTab(tab : any){
    this.active = tab;
  }

  onSubmit(){
    this.finalRead.meterNo = this.oldMeter.meterNumber;
    this.startRead.meterNo = this.newMeter.meterNumber;

    this.finalRead.mf = this.oldMeter.mf;
    this.startRead.mf = this.newMeter.mf;

    this.finalRead.readingType = "FR";
    this.startRead.readingType = "SR";

    this.finalRead.readSource = "web";
    this.startRead.readSource = "web";

    this.startRead.readingDate = this.finalRead.readingDate;

    let replacementObject : any = {};
    replacementObject ['oldMeterBean' ]  = this.finalRead;
    replacementObject ['newMeterBean' ]  = this.startRead;
    this.readService.replaceMeter(replacementObject).subscribe({next : success =>{
      console.log(success);
      alert("Meter replaced successfully.");
      this.oldMeter = undefined;
      this.newMeter = undefined; 
      this.oldMeterNo = undefined;
      this.previousReading = undefined;
      this.finalRead = {};
      this.startRead = {};
      
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  selectedFile : any;
  fileChange(event : any){
    this.selectedFile = event.target.files;
  }

  async uploadClicked(readType : string){
    let formData : FormData = new FormData();
    formData.append('xmlFile', this.selectedFile[0]);
    let meterNo;
    if(readType === 'FR'){
      meterNo = this.oldMeterNo;
    } else if(readType === 'SR'){
      meterNo = this.newMeter.meterNumber;
    }
    await this.readService.uploadReadXMLFile(formData, meterNo).subscribe( {next: (success : any)=>{
      if(readType === 'FR'){
        this.finalRead = success;
      } else if(readType === 'SR'){
        this.startRead = success;
      }
    }, error: (error : any) =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }
}
