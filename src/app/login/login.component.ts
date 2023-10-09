import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';
import { GlobalResourcesService } from '../utility/global-resources.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : any = {};
  private jwtHelper = new  JwtHelperService;
  loading : boolean = false;
  loginError : boolean = false;
  errorText! : string;

  constructor(private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
  }

  submitClicked(){
    this.loading = true;
    this.loginService.login(this.user).subscribe(success=>{
      this.loading = false;
      let result : any = success;
      let token = result.accessToken;
      let userDetails = this.processToken(token);
      if(userDetails.role === "HTCELL"){
        this.router.navigate(['/htadmin']);
      } else if(userDetails.role === "AMRCELL"){
        this.router.navigate(['/amrcell']);
      } else if(userDetails.role === "DEVELOPER"){
        this.router.navigate(['/developer']);
      }
    }, error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    });
  }

  processToken(token : any) : any{
    sessionStorage.setItem("token", token);
    let user = this.jwtHelper.decodeToken(token);
    sessionStorage.setItem("username", user.user);
    sessionStorage.setItem("role", user.role);
    let sessionEndTimestamp = new Date(new Date().getTime() + 60 * 60 * 1000).getTime();
    sessionStorage.setItem("session_end", sessionEndTimestamp.toString());
    return user;
  }
  
}
