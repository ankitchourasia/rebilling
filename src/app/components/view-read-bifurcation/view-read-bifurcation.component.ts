import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { MeterService } from 'src/app/services/meter-service';

@Component({
  selector: 'app-view-read-bifurcation',
  standalone: true,
  imports: [CommonModule, FormsModule, DirectiveModule],
  templateUrl: './view-read-bifurcation.component.html',
  styleUrls: ['./view-read-bifurcation.component.css']
})
export class ViewReadBifurcationComponent implements OnInit{
  consumption : any;
  loading : boolean = false;
  billMonth! : string;
  meterNo! : string;
  meterList : any;

  ngOnInit(): void {
    if(this.meterNo && this.billMonth){
      this.getBifurcationByMeterNoAndBillMonth(this.meterNo, this.billMonth);
    } else{
      this.getMeters();
    }
  }

  constructor(private readService : ReadService, private meterService : MeterService){
  }

  @Input("meter-no")
  set setMeterNo(meterNo : string){
    this.meterNo = meterNo;
  }

  @Input("bill-month")
  set setBillMonth(billMonth : string){
    this.billMonth = billMonth;
  }

  onSubmit(f: NgForm){
    if(f.form.invalid){ return; }
    let data = Object.assign(f.form.value);
    data.month = formatDate(data.month, 'MMM-yyyy', 'en-IN');
    this.getBifurcationByMeterNoAndBillMonth(data.meter, data.month);
  }

  getMeters(){
    let role = sessionStorage.getItem("role");
    if(role === GlobalResourcesService.ROLE_HTADMIN || role === GlobalResourcesService.ROLE_AMR){
      this.getMetersForHTAndAMR();
    } else if(role === GlobalResourcesService.ROLE_DEVELOPER){
      this.getMetersForDeveloper();
    } else if(role === GlobalResourcesService.ROLE_CIRCLE){
      this.getMetersForCircle();
    }
  }

  getMetersForHTAndAMR(){
    this.meterService.getAllMetersForBifurcation().subscribe({next : success =>{
      this.meterList = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getMetersForDeveloper(){
    this.meterService.getMetersForInvoiceGeneration().subscribe({next : success =>{
      this.meterList = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
  getMetersForCircle(){
    this.meterService.getMetersForCircleInvoiceApproval().subscribe({next : success =>{
      this.meterList = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getBifurcationByMeterNoAndBillMonth(meterNo : string, billMonth : string){
    this.loading = true;
    this.readService.getBifurcationByMeterNoAndBillMonth(meterNo, billMonth).subscribe({next : success =>{
      this.loading = false;
      this.consumption = success;
    }, error : error => {
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
