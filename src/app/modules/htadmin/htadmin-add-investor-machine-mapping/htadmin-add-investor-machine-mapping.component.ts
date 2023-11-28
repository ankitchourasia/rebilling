import { Component } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer-service';
import { InvestorService } from 'src/app/services/investor-service';
import { MachineService } from 'src/app/services/machine-service';
import { MappingService } from 'src/app/services/mapping-service';
import { PlantService } from 'src/app/services/plant-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-add-investor-machine-mapping',
  templateUrl: './htadmin-add-investor-machine-mapping.component.html',
  styleUrls: ['./htadmin-add-investor-machine-mapping.component.css']
})
export class HTAdminAddInvestorMachineMappingComponent {

  developers : any;
  developer : any;

  plants : any;
  plant : any;

  investors : any;
  investor : any;

  machines : any;
  machine : any;

  loading : boolean = false;

  constructor(private developerService : DeveloperService, private plantService : PlantService, private investorService : InvestorService, 
    private machineService : MachineService, private mappingService : MappingService){
      this.initializeForm();
  }

  initializeForm(){
    this.loading = false;
    this.developers = undefined;
    this.developer = undefined;
    this.plants = undefined;
    this.plant = undefined;
    this.investors = undefined;
    this.investor = undefined;
    this.machines = undefined;
    this.machine = undefined;
    this.getDevelopers();
    this.getInvestors();
    this.getUnmappedMachines();
  }

  getDevelopers(){
    this.developerService.getAllDeveloper().subscribe({next : success =>{
      this.developers = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  develperChange(developerId : any){
    this.getPlantsByDeveloperId(developerId);
  }

  getPlantsByDeveloperId(developerId : any){
    this.plantService.getByDeveloperId(developerId).subscribe({next : success =>{
      this.plants = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getInvestors(){
    this.investorService.getAllInvestor().subscribe({next : success =>{
      this.investors = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getUnmappedMachines(){
    this.machineService.getAllUnmappedMachine().subscribe({next : success =>{
      this.machines = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  onSubmit(){
    this.loading = false;
    let selectedMachines : any = [];
    this.machines.forEach((machine : any) => {
      if(machine.checked){
        selectedMachines.push(machine);
      }
    });
    if(selectedMachines.length < 1){
      alert("Please select atleast one machine...");
      return;
    }
    let data : any = {};
    data.developerMasterBean = this.developer;
    data.plantMasterBean = this.plant;
    data.investorMasterBean = this.investor;
    data.machineMasterBeanList = selectedMachines;

    this.mappingService.createInvestorMachineMapping(data).subscribe({next : success =>{
      alert("mapping created successfully");
      this.initializeForm();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }
}
