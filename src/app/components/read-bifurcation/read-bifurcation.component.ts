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
    read.ladjustment = read.ladjustmentUnit * this.consumption.hmf;
    this.calculateTotalConsumption(read);
  }

  calculateTotalConsumption(read : any){
    read.lconsumptionTotal =  read.lassessment + read.lconsumptionKwh - read.ladjustment;
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.consumption.fsumConsumptionKwh = 0;
    this.consumption.fsumFixedAdjustmentValue = 0;
    this.consumption.fsumAssessment = 0;
    this.consumption.fsumAdjustment = 0;
    this.consumption.bifurcateInvestorDtoList.forEach((element : any) => {
      this.consumption.fsumConsumptionKwh = this.consumption.fsumConsumptionKwh + element.lconsumptionKwh;
      this.consumption.fsumFixedAdjustmentValue = this.consumption.fsumFixedAdjustmentValue + element.lfixedAdjustmentPer;
      this.consumption.fsumAssessment = this.consumption.fsumAssessment + element.lassessment;
      this.consumption.fsumAdjustment = this.consumption.fsumAdjustment + element.ladjustment;
    });

    this.consumption.fgrandConsumptionKwh = this.consumption.fsumConsumptionKwh + this.consumption.fsumAssessment - this.consumption.fsumAdjustment;
    this.consumption.funallocatedConsumptionKwh = this.consumption.hgrandConsumptionKwh - this.consumption.fgrandConsumptionKwh;
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
