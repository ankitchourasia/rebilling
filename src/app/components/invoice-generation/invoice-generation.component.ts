import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeterService } from 'src/app/services/meter-service';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';
import { ViewReadBifurcationComponent } from '../view-read-bifurcation/view-read-bifurcation.component';

@Component({
  selector: 'app-invoice-generation',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewReadBifurcationComponent],
  templateUrl: './invoice-generation.component.html',
  styleUrls: ['./invoice-generation.component.css']
})
export class InvoiceGenerationComponent implements OnInit{
  
  meterList : any;
  loading : boolean = false;
  readings : any;
  invoice : any;
  invoices : any = [];
  data : any = {};
  role : any;

  constructor(private meterService: MeterService, private readService: ReadService, private ngbModal : NgbModal){}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    if(this.role === 'DEVELOPER'){
      this.getMeters();
    } else {
      this.getAllMeter();
    }
  }

  getMeters(){
    this.meterService.getMetersForInvoiceGeneration().subscribe({
      next: (success: any) =>{ this.meterList = success; },
      error: (error: any)=>{ console.log(error); }
    })
  }

  getAllMeter(){
    this.meterService.getAllMetersForInvoice().subscribe({
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
      
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  viewSubmitButton(){
    return this.readings?.every((reading : any)=> reading.invoiceStage === "invoice_freezed");
  }

  generateButtonClicked(investor : any, invoiceModal : any){
    if(this.role !== 'DEVELOPER'){
      alert("Only Developer can Bifurcate");
      return;
    }
    this.invoice = undefined;
    this.invoices = [];
    this.loading = true;
    this.readService.generateInvoiceByInvestorAndMonth(investor.investorCode, this.data.billMonth).subscribe({next : success =>{
      this.loading = false;
      this.invoices = success;
      if(this.invoices.length > 0){
        this.invoice = this.invoices[0];
        this.openInvoiceModal(invoiceModal);
      }
    }, error : error =>{
      this.loading = false;
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

  saveClicked(){
    if(this.invoices.length == 1){
      this.saveNonPPAInvoice(this.invoices[0]);
    } else if(this.invoices.length > 1){
      this.savePPAInvoice(this.invoices);
    }
  }

  saveNonPPAInvoice(invoice : any){
    this.loading = true;
    this.readService.saveNonPPAInvoice(invoice).subscribe({next : success =>{
      this.loading = false;
      console.log(success);
      this.ngbModal.dismissAll();
      alert("Invoice saved successfully..");
      this.onSubmit();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  savePPAInvoice(invoices : any){
    this.loading = true;
    this.readService.savePPAInvoice(invoices).subscribe({next : success =>{
      this.loading = false;
      console.log(success);
      this.ngbModal.dismissAll();
      alert("Invoice saved successfully..");
      this.onSubmit();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  submitForApproval(){
    this.loading = true;
    this.readService.submitInvoicesForApproval(this.readings).subscribe({next : success =>{
      this.loading = false;
      alert("Invoices submitted for approval");
      this.onSubmit();
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }});
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
