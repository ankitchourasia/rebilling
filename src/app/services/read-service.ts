import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private http : HttpClient) { }

  uploadFiles(files : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/xml/parsed-data/save", files, options);
  }

  getLatestMeterReadingByMeterNo(meterNo : string, billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/replace/meterNo/" + meterNo + "/month/" + billMonth, options);
  }

  createReading(reading : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter_reading/punch", reading, options);
  }

  get5PercentReportByStartAndEndDate(startDate : any, endDate : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/5percent/startDate/" + startDate + "/endDate/" + endDate, options);
  }

  approve5PercentReading(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/report/5percent/approve", readings, options);
  }

  get5PercentReportByApprovalStatusAndBillMonth(status : string, billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/5percent/approve/monthYear/" + billMonth + "/result/" + status, options);
  }

  forceAcceptReading(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/report/5percent/forceAccept", readings, options);
  }


  getAMRAcceptedReadByBillMonth(billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter_reading/amr_accepted/monthYear/" + billMonth, options);
  }

  getAMRFailedReadingsToForceApprove(billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/5percent/approve/monthYear/" +billMonth + "/result/fail/remark/calculated", options);
  }

  getReadToApproveForDeveloper(billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter_reading/ht_accepted/monthYear/" + billMonth, options);
  }
}
