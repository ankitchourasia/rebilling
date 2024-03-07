import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/directives/directive.module';

@Component({
  selector: 'app-read-bifurcation',
  standalone: true,
  imports: [CommonModule, FormsModule, DirectiveModule],
  templateUrl: './read-bifurcation.component.html',
  styleUrls: ['./read-bifurcation.component.css']
})
export class ReadBifurcationComponent implements OnInit{
  consumption : any;
  loading : boolean = false;
  ngOnInit(): void {
  }

  constructor(private readService : ReadService){
  }

  @Input("reading")
  set setConsumption(reading : any){
    if(reading){
      this.getconsumptionForBifurcation(reading);
    }
  }

  getconsumptionForBifurcation(reading : any){
    this.loading = true;
    this.readService.getConsumptionForBifurcation(reading).subscribe({next : success =>{
      this.loading = false;
      this.consumption = success;
    }, error : error => {
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  adjustmentChanged(read : any){
    read.ladjustment =  Number((read.ladjustmentUnit * this.consumption.hmf).toFixed(2));
    this.calculateTotalConsumption(read);
  }

  calculateTotalConsumption(read : any){
    read.lconsumptionTotal = Number((read.lassessment + read.lconsumptionKwh - read.ladjustment).toFixed(2));
    if(read.lconsumptionTotal < 0){
      alert("Total Consumption can not be negetive...");
      read.lconsumptionKwh = 0;
      read.ladjustment = 0;
      read.ladjustmentUnit = 0;
    }
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.consumption.fsumConsumptionKwh = 0;
    this.consumption.fsumFixedAdjustmentValue = 0;
    this.consumption.fsumAssessment = 0;
    this.consumption.fsumAdjustment = 0;
    this.consumption.bifurcateInvestorDtoList.forEach((element : any) => {
      this.consumption.fsumConsumptionKwh = Number((this.consumption.fsumConsumptionKwh + element.lconsumptionKwh).toFixed(2));
      this.consumption.fsumFixedAdjustmentValue =  Number((this.consumption.fsumFixedAdjustmentValue + element.lfixedAdjustmentPer).toFixed(2));
      this.consumption.fsumAssessment =  Number((this.consumption.fsumAssessment + element.lassessment).toFixed(2));
      this.consumption.fsumAdjustment = Number((this.consumption.fsumAdjustment + element.ladjustment).toFixed(2));
    });

    this.consumption.fgrandConsumptionKwh =  Number((this.consumption.fsumConsumptionKwh + this.consumption.fsumAssessment - this.consumption.fsumAdjustment).toFixed(2));
    this.consumption.funallocatedConsumptionKwh =  Number((this.consumption.hconsumptionKwh - this.consumption.fsumConsumptionKwh).toFixed(2));
  }

  submitClicked(){
    this.loading = true;
    this.readService.bifurcationConsumption(this.consumption, true).subscribe({
      next : success =>{
        this.loading = false;
        alert("Consumption bifurcated successfully.");
        console.log(success);
      }, error : error =>{
        this.loading = false;
        GlobalResourcesService.errorMessageHandeler(error);
        this.consumption = undefined;
      }})
  }

}
