import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit{
  
  constructor(private router : Router){
  }
  
  user : any;
  ngOnInit(): void {
    this.user = sessionStorage.getItem("username");
    console.log(this.user);
  }

  logoutClicked(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("session_end");
    this.router.navigate(['login']);
  }

  homeClicked(){
    let role = sessionStorage.getItem('role');
    if(role === "HTCELL"){
      this.router.navigate(['/htadmin/home']);
    } else if(role === "AMRCELL"){
      this.router.navigate(['/amrcell/home']);
    } else if(role === "DEVELOPER"){
      this.router.navigate(['/developer/home']);
    } else if(role === "CIRCLE"){
      this.router.navigate(['/circle/home']);
    }
  }

}
