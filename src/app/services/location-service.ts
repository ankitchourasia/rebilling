import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http : HttpClient) { }

  getAllLocation(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/location", options);
  }

  getByDivisionCode(divisionCode : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/location/division/" + divisionCode, options);
  }

  getAllRegions(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/location/regions", options);
  }

  getCircleByRegionName(regionName : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/location/circles/regionname/" + regionName, options);
  }

  getDivisionByCircleName(circleName : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/location/divisions/circlename/" + circleName, options);
  }
}
