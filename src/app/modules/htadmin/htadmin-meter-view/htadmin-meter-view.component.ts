import { Component } from '@angular/core';
import { MeterService } from 'src/app/services/meter-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

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
  page = 1;
  pageSize = 20;
  
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
      GlobalResourcesService.errorMessageHandeler(error);
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
      GlobalResourcesService.errorMessageHandeler(error);
    })
  }

  getData(){
    return this.meters.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
