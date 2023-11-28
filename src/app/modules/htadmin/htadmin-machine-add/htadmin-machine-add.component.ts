import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/services/location-service';
import { MachineService } from 'src/app/services/machine-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-machine-add',
  templateUrl: './htadmin-machine-add.component.html',
  styleUrls: ['./htadmin-machine-add.component.css']
})
export class HTAdminMachineAddComponent implements OnInit{

  machine : any = {};
  loading : boolean = false;
  locations : any;
  d : Date = new Date();

  constructor(private machineService : MachineService, private locationService : LocationService){
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
    this.machine.locationId = this.machine.location.id;
    this.machineService.createMachine(this.machine).subscribe({next:(success)=>{
      this.loading = false;
      alert("Machine Added Successfully");
      form.reset();
      this.machine = {};
    }, error: (error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
