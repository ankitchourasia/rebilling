import { Component } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer-service';
import { FeederService } from 'src/app/services/feeder-service';
import { MappingService } from 'src/app/services/mapping-service';
import { MeterService } from 'src/app/services/meter-service';
import { PlantService } from 'src/app/services/plant-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-add-meter-feeder-plant-mapping',
  templateUrl: './htadmin-add-meter-feeder-plant-mapping.component.html',
  styleUrls: ['./htadmin-add-meter-feeder-plant-mapping.component.css']
})
export class HTAdminAddMeterFeederPlantMappingComponent {
  developers : any;
  developer : any;

  plants : any;
  plant : any;

  feeders : any;
  feeder : any;

  meters : any;
  meter : any;

  loading : boolean = false;

  constructor(private developerService : DeveloperService, private plantService : PlantService, private feederService : FeederService, 
    private meterService : MeterService, private mappingService : MappingService){
      this.initializeForm();
  }

  initializeForm(){
    this.loading = false;
    this.developers = undefined;
    this.developer = undefined;
    this.plants = undefined;
    this.plant = undefined;
    this.feeders = undefined;
    this.feeder = undefined;
    this.meters = {};
    this.meter = {};
    this.getDevelopers();
    this.getPlants();
    this.getUnmappedMeters();
  }

  getDevelopers(){
    this.developerService.getAllDeveloper().subscribe({next : success =>{
      this.developers = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getPlants(){
    this.plantService.getAllPlant().subscribe({next : success =>{
      this.plants = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  plantChanged(locationId : any){
    this.getFeedersByLocationId(locationId);
  }

  getFeedersByLocationId(locationId : any){
    this.feederService.getByLocationId(locationId).subscribe({next : success =>{
      this.feeders = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getUnmappedMeters(){
    this.getMainMetersUnmapped();
    this.getCheckMetersUnmapped();
    this.getStandbyMetersUnmapped();
  }

  getMainMetersUnmapped(){
    this.meterService.getMetersUnmappedByCategory("MAIN").subscribe({next : success =>{
      this.meters.mainMeters = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getCheckMetersUnmapped(){
    this.meterService.getMetersUnmappedByCategory("CHECK").subscribe({next : success =>{
      this.meters.checkMeters = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getStandbyMetersUnmapped(){
    this.meterService.getMetersUnmappedByCategory("STANDBY").subscribe({next : success =>{
      this.meters.standbyMeters = success;
    }, error : error =>{
      console.log(error);
    }})
  }

  onSubmit(){
    this.loading = true;
    let data : any = {};
    data.developerId = this.developer.id;
    data.plantCode = this.plant.plantCode;
    data.feederCode = this.feeder.feederNumber;
    data.mainMeterNo = this.meter.mainMeter.meterNumber;
    data.checkMeterNo = this.meter.checkMeter.meterNumber;
    if(this.meter.standbyMeter){
      data.standbyMeterNo = this.meter.standbyMeter.meterNumber;
    } else{
      data.standbyMeterNo = "NA";
    }
    this.mappingService.createMeterFeederPlantMapping(data).subscribe({next : success =>{
      this.loading = false;
      alert("mapping created successfully");
      this.initializeForm();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
