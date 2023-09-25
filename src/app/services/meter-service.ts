import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  constructor(private http : HttpClient) { }

  createMeter(meterDetails : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter", meterDetails, options);
  }

  getByMeterNoAndStatus(meterNo : string, status : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meterno/" + meterNo +"/status/" + status, options);
  }

  getMeterMakes(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/make", options);
  }

  getMeterCTR(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/ctr", options);
  }

  getMeterMECTR(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/me-ctr", options);
  }

  getMeterPTR(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/ptr", options);
  }

  getMeterMEPTR(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/me-ptr", options);
  }

  getMeterDMF(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/dmf", options);
  }

  getMeterByMeterNoAndStatus(meterNo : string, status : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/meterno/" + meterNo + "/status/" + status, options);
  }

  getMeterByStatus(status : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/status/" + status, options);
  }

  getMetersByCategoryStatusAndIsMapped(category : string, status : string, isMapped : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/replace/category/" + category + "/status/" + status + "/mapped/" + isMapped, options);
  }
}
