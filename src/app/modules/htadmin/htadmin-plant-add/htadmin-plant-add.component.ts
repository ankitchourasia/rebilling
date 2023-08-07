import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/services/location-service';
import { PlantService } from 'src/app/services/plant-service';

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
    this.getAllLocations();
  }

  getAllLocations(){
    this.locationService.getAllLocation().subscribe( {next: (success)=>{
      this.locations = success;
    }, error: (error) =>{
      console.log(error);
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
      alert("Unable to add Plant");
      console.log(error);
    }})
  }
}
