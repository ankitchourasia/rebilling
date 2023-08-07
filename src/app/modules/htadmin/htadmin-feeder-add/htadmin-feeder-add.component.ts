import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeederService } from 'src/app/services/feeder-service';
import { LocationService } from 'src/app/services/location-service';

@Component({
  selector: 'app-feeder-add',
  templateUrl: './htadmin-feeder-add.component.html',
  styleUrls: ['./htadmin-feeder-add.component.css']
})
export class HTAdminFeederAddComponent implements OnInit{

  voltages = ["220 KV", "132 KV", "33 KV", "11 KV"];
  feeder : any = {};
  locations : any;
  loading : boolean = false;

  constructor(private locationService : LocationService, private feederService : FeederService){
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
    this.feeder.locationId = this.feeder.location.id;
    this.feederService.createFeeder(this.feeder).subscribe({ next: ()=>{
      this.loading = false;
      alert("Feeder Added Successfully.");
      form.reset();
      this.feeder = {};
    }, error: (error) =>{
      this.loading = false;
      alert("Unable to Add Feeder.");
      console.log(error);
    }})
  }
  
}
