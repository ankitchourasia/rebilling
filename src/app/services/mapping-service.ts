import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http : HttpClient) { }

  createInvestorMachineMapping(mapping : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/im/mapping", mapping, options);
  }

  createMeterFeederPlantMapping(mapping : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/mapping/mfp", mapping, options);
  }

  getCompleteMappingByMeterNo(meterNo : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/mapping/view-complete/meter/" + meterNo, options);
  }

}
