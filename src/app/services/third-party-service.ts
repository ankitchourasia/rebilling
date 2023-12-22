import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {

  constructor(private http : HttpClient) { }

  getThirdPartyDetailsByDeveloperIdAndPlantCode(developerId : string, plantCode : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/thirdparty/dto/developerId/" + developerId + "/plantCode/" + plantCode, options);
  }

  createThirdParty(thirdParty : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/thirdparty/save", thirdParty, options);
  }

  getAllThirdParty(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("rebilling/thirdparty/list", options);
  }

  activateThirdParty(thirdParty : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.put("/rebilling/thirdparty/active", thirdParty, options);
  }

  inactivateThirdParty(thirdParty : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.put("/rebilling/thirdparty/inactive", thirdParty, options);
  }

  updateThirdParty(thirdParty : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.put("/rebilling/thirdparty/update", thirdParty, options);
  }

  getSolarStatement(meterNo : string, billMonth : string, response : boolean = false){
    let options : any = {responseType: 'blob'};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("rebilling/statement/solar/meterNo/" + meterNo + "/monthYear/" + billMonth, options);
  }

  generateSolarStatement(meterNo : string, billMonth : string, response : boolean = false){
    let options : any = {responseType: 'json'};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("rebilling/statement/solar-generate-save/meterNo/" + meterNo + "/monthYear/" + billMonth, options);
  }

  downloadSolarStatement(meterNo : string, billMonth : string, response : boolean = false){
    let options : any = {responseType: 'blob'};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("rebilling/statement/solar-download/meterNo/" + meterNo + "/monthYear/" + billMonth, options);
  }

}
