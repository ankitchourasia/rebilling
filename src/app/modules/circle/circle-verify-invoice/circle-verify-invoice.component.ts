import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeterService } from 'src/app/services/meter-service';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-circle-verify-invoice',
  templateUrl: './circle-verify-invoice.component.html',
  styleUrls: ['./circle-verify-invoice.component.css']
})
export class CircleVerifyInvoiceComponent {
  meterList : any;
  loading : boolean = false;
  readings : any;
  invoice : any;
  invoices : any;
  data : any = {};

  constructor(private meterService: MeterService, private readService: ReadService, private ngbModal : NgbModal){}

  ngOnInit(): void {
    this.getMeters();
  }

  getMeters(){
    this.meterService.getMetersForCircleInvoiceApproval().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  onSubmit(){
    this.data.billMonth = formatDate(this.data.month, 'MMM-yyyy', 'en-IN');
    this.getDetailsForInvoiceGenerationByMeterNoAndMonth(this.data.meterNo, this.data.billMonth);
  }

  getDetailsForInvoiceGenerationByMeterNoAndMonth(meterNo : string, billMonth : string){
    this.readings = undefined;
    this.readService.getDetailsForInvoiceGenerationByMeterNoAndMonth(meterNo, billMonth).subscribe({next : success =>{
      this.readings = success;
      console.log(this.readings);
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  viewButtonClicked(investor : any, invoiceModal : any){
    this.invoice = undefined;
    this.readService.getInvoiceByInvoiceNo(investor.invoiceNumber).subscribe({next : success =>{
      this.invoices = success;
      if(this.invoices.length > 0){
        this.invoice = this.invoices[0];
        this.openInvoiceModal(invoiceModal);
      }
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  openInvoiceModal(invoiceModal : any){
    this.ngbModal.open(invoiceModal, {size : 'xl'});
  }

  rejectClicked(){
    let confirmAlertResponse : any = confirm("All Invoices and Bifurcation will be deleted, Do you want to reject invoices ?");
    if (confirmAlertResponse) {
      this.loading = true;
      this.readService.rejectClicked(this.readings).subscribe({next : success =>{
        this.loading = false;
        alert("invoice rejected successfully");
        this.readings = undefined;
      }, error : error =>{
        this.loading = false;
        GlobalResourcesService.errorMessageHandeler(error);
      }})
    }
    
  }

  approveClicked(){
    let confirmAlertResponse : any = confirm("All Invoices will be approved for payment, Do you want to approve invoices ?");
    if (confirmAlertResponse) {
      this.loading = true;
      this.readService.approveClicked(this.readings).subscribe({next : success =>{
        this.loading = false;
        alert("invoice approved successfully");
        this.onSubmit();
      }, error : error =>{
        this.loading = false;
        GlobalResourcesService.errorMessageHandeler(error);
      }})
    }
  }

  viewApprovalButtons(){
    return this.readings?.every((reading : any)=> reading.invoiceStage === "invoice_submitted");
  }

  viewBifurcationClicked(bifucationModal : any){
    this.openInvoiceModal(bifucationModal);
  }

  print(invoiceTable : any){
    let print : any = document.getElementById(invoiceTable);
    let newWin : any = window.open("");
    newWin.document.write(print.outerHTML);
    newWin.print();
    newWin.close();
  }
}
