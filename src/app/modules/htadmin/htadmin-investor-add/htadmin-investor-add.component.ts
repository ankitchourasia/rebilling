import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvestorService } from 'src/app/services/investor-service';
import { LocationService } from 'src/app/services/location-service';

@Component({
  selector: 'app-htadmin-investor-add',
  templateUrl: './htadmin-investor-add.component.html',
  styleUrls: ['./htadmin-investor-add.component.css']
})
export class HTAdminInvestorAddComponent implements OnInit{

  investor : any = {};
  loading : boolean = false;
  locations : any;

  constructor(private investorService : InvestorService, private locationService : LocationService){
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
    this.investor.locationId = this.investor.location.id;
    this.investorService.createInvestor(this.investor).subscribe({next:(success)=>{
      this.loading = false;
      alert("Investor Added Successfully");
      this.investor = {};
      form.reset();
    }, error: (error)=>{
      this.loading = false;
      alert("Unable to add Investor");
      console.log(error);
    }})
  }
}
