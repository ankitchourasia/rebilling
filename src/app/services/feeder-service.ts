import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeederService {

  constructor(private http : HttpClient) { }

  getAllFeeder(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/feeder", options);
  }

  createFeeder(feeder : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/feeder", feeder, options);
  }

  getByFeederNo(feederNo : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/feeder/feederNumber/" + feederNo, options);
  }

  getByLocationId(locationId : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/feeder/list/locationId/" + locationId, options);
  }
}
