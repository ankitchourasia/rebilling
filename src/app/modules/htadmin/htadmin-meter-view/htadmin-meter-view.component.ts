import { Component } from '@angular/core';
import { MeterService } from 'src/app/services/meter-service';

@Component({
  selector: 'app-htadmin-meter-view',
  templateUrl: './htadmin-meter-view.component.html',
  styleUrls: ['./htadmin-meter-view.component.css']
})
export class HTAdminMeterViewComponent {

  meterBy! : string;
  status! : string;
  meterNumber!: string;
  meters : any = [];
  loading : boolean = false;
  constructor(private meterService : MeterService){
  }

  searchClicked(){
    this.loading = true;
    if(this.meterBy === 'Status'){
      this.getByStatus(this.status);
    } else{
      this.getByMeterNoAndStatus(this.meterNumber, this.status);
    }
  }

  getByStatus(status : string){
    this.meterService.getMeterByStatus(status, false).subscribe(success =>{
      this.loading = false;
      if(success){
        this.meters = success;
      }
    }, error =>{
      this.loading = false;
      console.log(error);
    })
  }

  getByMeterNoAndStatus(meterNo : string, status : string){
    this.meters = [];
    this.meterService.getMeterByMeterNoAndStatus(meterNo, status, false).subscribe(success =>{
      this.loading = false;
      if(success){
        this.meters.push(success);
      }
    }, error =>{
      this.loading = false;
      console.log(error);
    })
  }

}
