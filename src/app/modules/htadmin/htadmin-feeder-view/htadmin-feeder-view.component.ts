import { Component, OnInit } from '@angular/core';
import { FeederService } from 'src/app/services/feeder-service';

@Component({
  selector: 'app-htadmin-feeder-view',
  templateUrl: './htadmin-feeder-view.component.html',
  styleUrls: ['./htadmin-feeder-view.component.css']
})
export class HTAdminFeederViewComponent implements OnInit{
  feeders : any = [];
  loading : boolean = false;
  viewBy : string = "All";
  feederNo! : string;
  page : number = 1;
  pageSize : number = 10;

  constructor(private feederService : FeederService){
  }

  searchClicked(){
    if(this.viewBy === 'Feeder-No'){
      this.getByFeederNo(this.feederNo);
    } else{
      this.getAllFeeders();
    }
  }

  ngOnInit(): void {
    this.searchClicked();
  }

  getAllFeeders(){
    this.loading = true;
    this.feederService.getAllFeeder().subscribe({next:(success)=>{
        this.loading = false;
        this.feeders = success;
      }, error: (error)=>{
        this.loading = false;
        console.log(error);
      }
    });
  }

  getByFeederNo(feederNo : string){
    this.feeders = [];
    this.loading = true;
    this.feederService.getByFeederNo(feederNo).subscribe({next:(success) =>{
      this.loading = false;
      this.feeders.push(success);
    }, error : (error) =>{
      this.loading = false;
      console.log(error);
    }})
  }

  getData(){
    return this.feeders.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
