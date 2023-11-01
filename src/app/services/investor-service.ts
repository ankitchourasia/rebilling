import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  constructor(private http : HttpClient) { }

  getAllInvestor(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/investor", options);
  }

  createInvestor(feeder : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/investor", feeder, options);
  }

  getByInvestorId(investorId : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/investor/id/" + investorId, options);
  }

  getInvestorsByDeveloperIdAndPlantCodeForThirdParty(developerId : string, plantCode : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/thirdparty/investors/developerId/" + developerId + "/plantCode/" + plantCode, options);
  }
}
