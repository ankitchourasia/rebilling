import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/services/location-service';
import { PlantService } from 'src/app/services/plant-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-plant-add',
  templateUrl: './htadmin-plant-add.component.html',
  styleUrls: ['./htadmin-plant-add.component.css']
})
export class HTAdminPlantAddComponent implements OnInit {
  plant : any = {};
  loading : boolean = false;
  locations : any;
  d : Date = new Date();

  constructor(private plantService : PlantService, private locationService : LocationService){
  }

  ngOnInit(): void {
    this.getAllRegions();
  }

  regions : any;
  regionName! : string;
  circles : any;
  circleName! : string;
  getAllRegions(){
    this.locationService.getAllRegions().subscribe( {next: (success)=>{
      this.regions = success;
    }, error: (error) =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getCircleByRegionName(){
    this.locationService.getCircleByRegionName(this.regionName).subscribe( {next: (success)=>{
      this.circles = success;
    }, error: (error) =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getDivisionByCircleName(){
    this.locationService.getDivisionByCircleName(this.circleName).subscribe( {next: (success)=>{
      this.locations = success;
    }, error: (error) =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  onSubmit(form : NgForm){
    this.loading = true;
    this.plant.locationId = this.plant.location.id;
    this.plantService.createPlant(this.plant).subscribe({next:(success)=>{
      this.loading = false;
      alert("Plant Added Successfully");
      form.reset();
      this.plant = {};
    }, error: (error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
