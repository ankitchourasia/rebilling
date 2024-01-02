import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  loading : boolean = false;

  constructor(private loginService : LoginService, private router : Router, private activeModal : NgbActiveModal){
  }

  submitPassword(f: NgForm){
    if(f.form.invalid){ return; }
    let data = Object.assign(f.form.value);
    if(data.newPassword !== data.confirmPassword){
      alert("New and Confirm Passwords did not match.");
      return;
    }
    if(data.newPassword === data.oldPassword){
      alert("New and Old Passwords can not be same.");
      return;
    }
    this.loading = true;
    this.loginService.resetPassword(data.oldPassword, data.newPassword).subscribe({
      next: (success: any) =>{ 
        this.loading = false;
        alert("Password set successfully");
        this.closeActiveModal();
        this.loginService.logout();
      },
      error: (error: any)=>{ 
        this.loading = false; 
        GlobalResourcesService.errorMessageHandeler(error);
      }
    })
  }

  closeActiveModal(){
    this.activeModal.close();
  }
}
