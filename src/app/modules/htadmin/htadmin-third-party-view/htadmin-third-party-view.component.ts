import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThirdPartyService } from 'src/app/services/third-party-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-htadmin-third-party-view',
  templateUrl: './htadmin-third-party-view.component.html',
  styleUrls: ['./htadmin-third-party-view.component.css']
})
export class HTAdminThirdPartyViewComponent {

  editClicked : boolean = false;
  consumers : any;
  loading : boolean = false;
  constructor(private thirdPartyService : ThirdPartyService, private ngbModal : NgbModal){
    this.getAllThirdParty();
  }

  getAllThirdParty(){
    this.thirdPartyService.getAllThirdParty().subscribe({next : success => {
      this.consumers = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  activeButtonClicked(consumer : any, ){
    this.loading = true;
    this.thirdPartyService.activateThirdParty(consumer).subscribe({ next : success =>{
      this.loading = false;
      alert("Consumer activated successfully...");
      this.getAllThirdParty();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  inactiveButtonClicked(consumer : any, ){
    this.loading = true;
    this.thirdPartyService.inactivateThirdParty(consumer).subscribe({ next : success =>{
      this.loading = false;
      alert("Consumer inactive successfully...");
      this.getAllThirdParty();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  consumer : any;
  viewAndEditClicked(consumer : any, editModal : any){
    this.editClicked = false;
    this.consumer = consumer;
    this.ngbModal.open(editModal, { size : 'xl', keyboard : false, backdrop : 'static'})
  }

  formSubmitted(){
    this.loading = true;
    this.thirdPartyService.updateThirdParty(this.consumer).subscribe({ next : success =>{
      this.loading = false;
      alert("Consumer updated successfully...");
      this.ngbModal.dismissAll();
      this.getAllThirdParty();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  editButtonClicked(){
    this.editClicked = true;
  }
}
