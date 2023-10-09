import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MeterService } from 'src/app/services/meter-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ReadService } from 'src/app/services/read-service';

@Component({
  selector: 'app-consumption-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.css']
})
export class ConsumptionReportComponent implements OnInit {

  meterList: any = null;
  billMonth: any = null;
  constructor(private meterService: MeterService, private readService: ReadService){}

  ngOnInit(): void {
    let role: any = sessionStorage.getItem('role');
    this.getMeters();
  }

  getMeters(){
    this.meterService.getMetersForConsumptionReport().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  onSubmit(f: NgForm){
    if(f.form.invalid){ return; }
    let data = Object.assign(f.form.value);
    data.month = formatDate(data.month, 'MMM-yyyy', 'en-IN');
    console.log(data);
   this.getConsumptionByMeterNoAndMonth(data.meter, data.month);
  }

  getConsumptionByMeterNoAndMonth(meterNo: string, month: string){
    this.readService.getConsumptionByMeterNoAndMonth(meterNo, month).subscribe({
      next: (success: any) =>{ console.log(success) },
      error: (error: any)=>{ console.log(error); }
    })
  }
}
