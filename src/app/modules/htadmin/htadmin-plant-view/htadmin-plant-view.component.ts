import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-plant-view',
  templateUrl: './htadmin-plant-view.component.html',
  styleUrls: ['./htadmin-plant-view.component.css']
})
export class HTAdminPlantViewComponent implements OnInit{
  
  plants : any = [];
  loading : boolean = false;
  page = 1;
  pageSize = 20;

  constructor(private plantService : PlantService){
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.plantService.getAllPlant().subscribe({next: (success)=>{
      this.loading = false;
      this.plants = success;
    }, error:(error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getData(){
    return this.plants.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
