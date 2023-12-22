import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeterService } from 'src/app/services/meter-service';
import { ThirdPartyService } from 'src/app/services/third-party-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-solar-statement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download-solar-statement.component.html',
  styleUrls: ['./download-solar-statement.component.css']
})
export class DownloadSolarStatementComponent {

  meterList : any;
  loading : boolean = false;
  statements : any[] = [];
  statement : any;
  constructor(private meterService: MeterService, private thirdPartyService : ThirdPartyService){
    this.getMeters();
  }

  getMeters(){
    this.meterService.getMetersForConsumptionReport().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  onSubmit(form : any){
    if(form.form.invalid){ return; }
    let data = Object.assign(form.form.value);
    data.month = formatDate(data.month, 'MMM-yyyy', 'en-IN');
    this.generateSolarStatement(data.meter, data.month);
  }

  generateSolarStatement(meterNo : string, billMonth : string){
    this.loading = true;
    this.thirdPartyService.generateSolarStatement(meterNo, billMonth).subscribe({next : (success : any) =>{
      this.statements = success;
      console.log(this.statements);
      if(this.statements?.length){
        this.statement = this.statements[0];
        console.log("inside", this.statement)
      }
      this.loading = false;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  downloadSolarStatement(meterNo : string, billMonth : string){
    this.loading = true;
    this.thirdPartyService.downloadSolarStatement(meterNo, billMonth).subscribe({next : success =>{
      let file = new Blob([success]);
      saveAs(file, 'solar_statement_' + meterNo + '_' + billMonth + '.pdf');
      this.loading = false;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
