import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient, private router : Router) { }

  public login(user: any, response : boolean = false){
    let options : any = {};
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/login", user, options);
  }

  isLogedIn() : boolean{
    return true;
  }

  public resetPassword(oldPassword : string, newPassword : string, response : boolean = false){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("old-password", oldPassword);
    httpParams = httpParams.append("new-password", newPassword);
    let options : any = {
      params : httpParams
    };
    if(response){
      options["observe"] = "response";
    }
    return this.http.post("/rebilling/user/change_password", {}, options);
  }

  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("session_end");
    this.router.navigate(['login']);
  }

}
