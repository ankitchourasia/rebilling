import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalResourcesService {

  constructor() { }

  public static ROLE_HTADMIN = "HTCELL";
  public static ROLE_AMR = "AMRCELL";
  public static ROLE_DEVELOPER = "DEVELOPER";
  public static ROLE_CIRCLE = "CIRCLE";

  public static errorMessageHandeler(error : any, customMessage : any = undefined){
    console.log(error);
    if(error?.error?.message){
      alert(error.error.message);
    } else if(customMessage){
      alert(customMessage);
    } else {
      alert("Some error occurred.");
    }
  }

}
