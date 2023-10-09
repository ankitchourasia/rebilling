import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeveloperService } from 'src/app/services/developer-service';
import { LocationService } from 'src/app/services/location-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-developer-add',
  templateUrl: './htadmin-developer-add.component.html',
  styleUrls: ['./htadmin-developer-add.component.css']
})
export class HTAdminDeveloperAddComponent implements OnInit{
  
  developer : any = {};
  loading : boolean = false;
  locations : any;

  constructor(private developerService : DeveloperService, private locationService : LocationService){
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(){
    this.locationService.getAllLocation().subscribe( {next: (success)=>{
      this.locations = success;
    }, error: (error) =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  onSubmit(form : NgForm){
    this.loading = true;
    this.developer.locationId = this.developer.location.id;
    this.developerService.createDeveloper(this.developer).subscribe({next:(success)=>{
      this.loading = false;
      alert("Developer Added Successfully");
      form.reset();
      this.developer = {};
    }, error: (error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
