import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer-service';

@Component({
  selector: 'app-htadmin-developer-view',
  templateUrl: './htadmin-developer-view.component.html',
  styleUrls: ['./htadmin-developer-view.component.css']
})
export class HTAdminDeveloperViewComponent implements OnInit{
  
  developers : any = [];
  loading : boolean = false;
  page : number = 1;
  pageSize : number = 10;
  
  constructor(private developerService : DeveloperService){
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.developerService.getAllDeveloper().subscribe({next:(success)=>{
      this.loading = false;
      this.developers = success;
    }, error: (error)=>{
      this.loading = false;
      console.log(error);
    }})
  }

  getData(){
    return this.developers.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
