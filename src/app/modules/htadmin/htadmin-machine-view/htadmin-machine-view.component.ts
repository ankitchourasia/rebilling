import { Component, OnInit } from '@angular/core';
import { MachineService } from 'src/app/services/machine-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-machine-view',
  templateUrl: './htadmin-machine-view.component.html',
  styleUrls: ['./htadmin-machine-view.component.css']
})
export class HTAdminMachineViewComponent implements OnInit{

  machines : any = [];
  loading : boolean = false;
  page = 1;
  pageSize = 20;

  constructor(private machineService : MachineService){
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.machineService.getAllMachine().subscribe({next: (success)=>{
      this.loading = false;
      this.machines = success;
    }, error:(error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getData(){
    return this.machines.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
