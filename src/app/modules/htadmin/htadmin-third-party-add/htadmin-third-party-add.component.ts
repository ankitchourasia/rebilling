import { Component } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer-service';
import { InvestorService } from 'src/app/services/investor-service';
import { PlantService } from 'src/app/services/plant-service';
import { ThirdPartyService } from 'src/app/services/third-party-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-third-party-add',
  templateUrl: './htadmin-third-party-add.component.html',
  styleUrls: ['./htadmin-third-party-add.component.css']
})
export class HTAdminThirdPartyAddComponent {

  developers : any;
  plants : any;
  investors : any;
  
  developer : any;
  plant : any;
  investor : any;
  thirdPartyDTO : any;

  data : any = {};

  loading : boolean = false;

  constructor(private developerService : DeveloperService, private plantService : PlantService, private investorService : InvestorService, 
    private thirdPartyService : ThirdPartyService){
      this.getAllDevelopers();
      this.getAllPlants();
  }

  getAllDevelopers(){
    this.developerService.getAllDeveloper().subscribe({next : success =>{
      this.developers = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getAllPlants(){
    this.plantService.getAllPlant().subscribe({next : success =>{
      this.plants = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  developerOrPlantChanged(){
    this.investor = undefined;
    this.thirdPartyDTO = undefined;
    if(this.plant && this.developer){
      this.getInvestorsByDeveloperIdAndPlantCode();
      this.getThirdPartyDetailsByDeveloperIdAndPlantCode();
    }
  }

  getInvestorsByDeveloperIdAndPlantCode(){
    this.investors = [];
    this.investorService.getInvestorsByDeveloperIdAndPlantCodeForThirdParty(this.developer.id, this.plant.plantCode).subscribe({next : success =>{
      this.investors = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  getThirdPartyDetailsByDeveloperIdAndPlantCode(){
    this.thirdPartyService.getThirdPartyDetailsByDeveloperIdAndPlantCode(this.developer.id, this.plant.plantCode).subscribe({next : success =>{
      this.thirdPartyDTO = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  formSubmitted(){
    this.loading = true;
    this.data.region = this.thirdPartyDTO.plantRegion;
    this.data.circle = this.thirdPartyDTO.plantCircle;
    this.data.division = this.thirdPartyDTO.plantDivision;
    this.data.developerId = this.thirdPartyDTO.developerId;
    this.data.developerName = this.thirdPartyDTO.developerName;
    this.data.plantCode = this.thirdPartyDTO.plantCode;
    this.data.plantName = this.thirdPartyDTO.plantName;
    // this.data.plantCapacity = this.thirdPartyDTO.plantCapacity;
    this.data.investorCode = this.investor.investorCode;
    this.data.investorName = this.investor.investorName;
    this.data.mfpId = this.thirdPartyDTO.mfpId;
    this.data.feederNumber = this.thirdPartyDTO.feederNumber;
    this.data.feederInjectingSubstationName = this.thirdPartyDTO.feederInjectingSubstationName;
    this.data.feederCircuitVoltage = this.thirdPartyDTO.feederCircuitVoltage;
    this.data.userid = sessionStorage.getItem('username');
    this.data.commissionDate = this.thirdPartyDTO.plantCommissionDate;
    this.data.siteLocation = this.thirdPartyDTO.siteLocation;
    this.data.mainMeterNo = this.thirdPartyDTO.mainMeterNo;
    this.data.checkMeterNo = this.thirdPartyDTO.checkMeterNo;
    this.data.standbyMeterNo = this.thirdPartyDTO.standbyMeterNo;

    this.thirdPartyService.createThirdParty(this.data).subscribe({next : success =>{
      this.loading = false;
      alert("Third party created successfully");
      this.thirdPartyDTO = undefined;
      this.developer = undefined;
      this.plant = undefined;
      this.investor = undefined;
      this.data = {};
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

}
