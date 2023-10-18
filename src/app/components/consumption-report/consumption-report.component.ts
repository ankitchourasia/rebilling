import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MeterService } from 'src/app/services/meter-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ReadService } from 'src/app/services/read-service';
import { ReadBifurcationComponent } from '../read-bifurcation/read-bifurcation.component';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-consumption-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReadBifurcationComponent],
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.css']
})
export class ConsumptionReportComponent implements OnInit {

  meterList: any = null;
  billMonth: any = null;
  reading: any;
  role!: any;
  loading : boolean = false;
  constructor(private meterService: MeterService, private readService: ReadService){}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.getMeters();
  }

  getMeters(){
    this.meterService.getMetersForConsumptionReport().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  onSubmit(f: NgForm){
    this.viewBifurcation = false;
    if(f.form.invalid){ return; }
    let data = Object.assign(f.form.value);
    data.month = formatDate(data.month, 'MMM-yyyy', 'en-IN');
    this.getConsumptionByMeterNoAndMonth(data.meter, data.month);
  }

  getConsumptionByMeterNoAndMonth(meterNo: string, month: string){
    this.reading = undefined;
    this.loading = true;
    this.readService.getConsumptionByMeterNoAndMonth(meterNo, month).subscribe({
      next: (success: any) =>{ this.reading = success; this.loading = false; },
      error: (error: any)=>{ GlobalResourcesService.errorMessageHandeler(error); this.loading = false; }
    })
  }

  viewBifurcation : boolean = false;

  bifurcateButtonClicked(){
    this.viewBifurcation = true;
  }

}
