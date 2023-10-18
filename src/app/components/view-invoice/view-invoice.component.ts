import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit{

  loading : boolean = false;
  invoiceNo! : string;
  invoices : any = [];
  invoice : any;

  ngOnInit(): void {
  }

  constructor(private readService : ReadService){
  }

  onSubmit(){
    this.invoices = [];
    this.readService.getInvoiceByInvoiceNo(this.invoiceNo).subscribe({next : success =>{
      this.invoices = success;
      if(this.invoices.length > 0){
        this.invoice = this.invoices[0];
      }
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }})
  }

  print(invoiceTable : any){
    let print : any = document.getElementById(invoiceTable);
    let newWin : any = window.open("");
    newWin.document.write(print.outerHTML);
    newWin.print();
    newWin.close();
  }
}
