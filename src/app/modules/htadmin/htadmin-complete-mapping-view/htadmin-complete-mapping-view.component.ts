import { Component } from '@angular/core';
import { MappingService } from 'src/app/services/mapping-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-complete-mapping-view',
  templateUrl: './htadmin-complete-mapping-view.component.html',
  styleUrls: ['./htadmin-complete-mapping-view.component.css']
})
export class HTAdminCompleteMappingViewComponent {

  meterNo! : string;
  mapping : any;
  loading : boolean = false;
  active = 1;

  constructor(private mappingService : MappingService){
  }

  onSubmit(){
    this.getMappingByMeterNo();
  }

  getMappingByMeterNo(){
    this.mapping = undefined;
    this.loading = true;
    this.mappingService.getCompleteMappingByMeterNo(this.meterNo).subscribe({next : success =>{
      this.loading = false;
      this.mapping = success;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
