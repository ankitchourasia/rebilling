import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
//import { LoginService } from "../services/login/login.service";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class CanActivateAuthGuard implements CanActivate,CanActivateChild{
    
    constructor(private router: Router,private authorizationService: LoginService){
    }

    public canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean{
        if(this.authorizationService.isLogedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute,state);
    }
}