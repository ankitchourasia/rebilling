import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http : HttpClient) { }

  getAllDeveloper(response : boolean = false){
    let options : any;
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/developer", options);
  }

  createDeveloper(feeder : any, response : boolean = false){
    let options : any;
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/developer", feeder, options);
  }

  getByDeveloperId(developerId : string, response : boolean = false){
    let options : any;
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/developer/id/" + developerId, options);
  }
}
