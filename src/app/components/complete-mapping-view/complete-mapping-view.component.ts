import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MappingService } from 'src/app/services/mapping-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-complete-mapping-view',
  standalone: true,
  imports:[CommonModule, FormsModule, NgbModule],
  templateUrl: './complete-mapping-view.component.html',
  styleUrls: ['./complete-mapping-view.component.css']
})
export class CompleteMappingViewComponent {

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
