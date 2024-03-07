import { HttpClient, HttpParams } from '@angular/common/http';
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

  validateAMRValidatedReadByHT(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter_reading/amr_accepted/htAccept", readings, options);
  }

  approveHTAcceptedRead(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter_reading/ht_accepted/developer-accept", readings, options);
  }

  rejectHTAcceptedRead(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter_reading/ht_accepted/developer-reject", readings, options);
  }

  getReadByBillMonthAndStatus(billMonth : string, status : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/5percent/approve/monthYear/" + billMonth + "/result/" + status, options);
  }

  getReadHistoryByMeterNo(meterNo : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter_reading/meterNo/" + meterNo + "/history", options);
  }

  getConsumptionByMeterNoAndMonth(meterNo : string, month: string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter_reading/meterConsumption/meterNo/" + meterNo + "/monthYear/" + month , options);
  }

  getConsumptionForBifurcation(reading : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/bifurcate/empty", reading, options);
  }

  bifurcationConsumption(consumption : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/bifurcate", consumption, options);
  }

  getDetailsForInvoiceGenerationByMeterNoAndMonth(meterNo : string, month: string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/invoice/load/meterNo/" + meterNo + "/monthYear/" + month , options);
  }

  generateInvoiceByInvestorAndMonth(investor : string, month: string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/invoice/generate/investor/" + investor + "/monthYear/" + month , options);
  }

  getInvoiceByInvoiceNo(invoiceNo : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/invoice/view/invoiceNumber/" + invoiceNo, options);
  }

  saveNonPPAInvoice(invoice : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/invoice/generate/save-non-ppwa", invoice, options);
  }

  savePPAInvoice(invoices : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/invoice/generate/save-ppwa", invoices, options);
  }

  submitInvoicesForApproval(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/invoice/submit", readings, options);
  }

  approveClicked(remark : string, readings : any, response : boolean = false){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("remark", remark);
    let options : any = {
      params : httpParams
    };
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/invoice/approve", readings, options);
  }

  rejectClicked(remark : string,readings : any, response : boolean = false){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("remark", remark);
    let options : any = {
      params : httpParams
    };
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/invoice/reject", readings, options);
  }

  getBifurcationByMeterNoAndBillMonth(meterNo : string, billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/bifurcate/get/dto/meterNo/" + meterNo + "/monthYear/" + billMonth, options);
  }

  get5PercentReportBybillMonth(billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/5percent/month/" + billMonth, options);
  }

  createStartReading(reading : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter_reading/SR", reading, options);
  }

  getLastMeterReadingforReplacementByMeterNo(meterNo : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/meter/replace/last/read/meternumber/" + meterNo, options);
  }

  replaceMeter(readings : any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/meter/replace", readings, options);
  }

  getAbsentRead(billMonth : string, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.get("/rebilling/report/absent-present/monthYear/" + billMonth, options);
    
  }

}
