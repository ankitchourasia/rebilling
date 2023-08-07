import { Component, OnInit } from '@angular/core';
import { InvestorService } from 'src/app/services/investor-service';

@Component({
  selector: 'app-htadmin-investor-view',
  templateUrl: './htadmin-investor-view.component.html',
  styleUrls: ['./htadmin-investor-view.component.css']
})
export class HTAdminInvestorViewComponent implements OnInit{
  investors : any[] = [];
  loading : boolean = false;
  page : number = 1;
  pageSize : number = 25;

  constructor(private investorService : InvestorService){
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.investorService.getAllInvestor().subscribe({ next: (success: any)=>{
      this.loading = false;
      this.investors = success;
    }, error:(error)=>{
      this.loading = false;
      console.log(error);
    }})
  }

  getData(){
    return this.investors.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  investor : any = {};
  viewDetailsClicked(investor : any){
    this.investor = investor;
  }

}
