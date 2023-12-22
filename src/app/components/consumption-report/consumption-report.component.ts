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
    if(this.role === GlobalResourcesService.ROLE_DEVELOPER){
      this.getMetersforDeveloper();
    } else if(this.role === GlobalResourcesService.ROLE_CIRCLE){
      this.getMetersForCircle();
    } else{
      this.getMeters();
    }
  }

  getMeters(){
    this.meterService.getMetersForConsumptionReport().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  getMetersforDeveloper(){
    this.meterService.getMetersForConsumptionReportforDeveloper().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  getMetersForCircle(){
    this.meterService.getMetersForConsumptionReportforCircle().subscribe({
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

  print(id : string){
    let print = document.getElementById(id);
    let newWin = window.open("");
    if(newWin && print){
      newWin.document.write(print.outerHTML);
      newWin.print();
      newWin.close();
    }
  }

  // exportTable(tableID : any){
  //   let dataType = 'data:application/vnd.ms-excel';
  //   let fileName =  `consumption_report_${this.reading.meterNo}_${this.reading.monthYear}`;
  //   let htmltable = document.getElementById(tableID);
  //   if(htmltable){
  //     let tableHTML = htmltable.outerHTML;
  //     this.downloadByBlob(tableHTML, dataType, fileName, 'xls');
  //   }
  // }

  // downloadByBlob(content : any, dataType : any, fileName : string, extention : string){
  //   let file = new Blob([content], {type: dataType});
  //   const fileURL = window.URL.createObjectURL(file);
  //   //window.open(fileURL, '_blank');
  //   //------------------OR----------------------
  //   let anchorElement = document.createElement("a");
  //   anchorElement.href = fileURL;
  //   anchorElement.download = fileName + "." + extention;
  //   anchorElement.click();
  //   anchorElement.remove();
  // }

}
