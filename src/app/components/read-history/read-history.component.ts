import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-read-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read-history.component.html',
  styleUrls: ['./read-history.component.css']
})
export class ReadHistoryComponent implements OnInit{
  meterNumber! : string;
  loading : boolean = false;
  readings : any;
  ngOnInit(): void {
  }

  constructor(private readService : ReadService){
  }

  searchClicked(){
    this.loading = true;
    this.readService.getReadHistoryByMeterNo(this.meterNumber).subscribe({ next : success =>{
      this.loading = false;
      this.readings = success;
    }, error : error =>{
      this.loading = false;
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }

}
