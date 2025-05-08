import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from 'src/app/directives/search-filter.pipe';
import { InvestorService } from 'src/app/services/investor-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

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
      this.filteredData = this.investors;
    }, error:(error)=>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getData(){
    return this.filteredData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  investor : any = {};
  viewDetailsClicked(investor : any){
    this.investor = investor;
  }

  filteredData : any = [];
  searchChanged(searchedText : any){
    console.log(searchedText.viewModel);
    let filter = new SearchFilterPipe();
    this.filteredData = filter.transform(this.investors, searchedText.viewModel);
  }

}
