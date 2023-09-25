import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http : HttpClient) { }

  getAllMachine(response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/machine", options);
  }

  createMachine(feeder : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/machine", feeder, options);
  }

  getByMachineId(machineId : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/machine/id/" + machineId, options);
  }
}
