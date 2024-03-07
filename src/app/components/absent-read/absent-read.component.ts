import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

@Component({
  selector: 'app-absent-read',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absent-read.component.html',
  styleUrls: ['./absent-read.component.css']
})
export class AbsentReadComponent {
  loading : boolean = false;
  billMonth : any;
  readings : any = [];
  constructor(private readService : ReadService){
  }
  ngOnInit(): void {
  }

  searchButtonClicked(){
    let month = formatDate(this.billMonth, "MMM-yyyy", "en-IN");
    this.getAbsentRead(month);
  }

  getAbsentRead(billMonth :any){
    this.readings = [];
    this.readService.getAbsentRead(billMonth).subscribe({next : success =>{
      this.readings = success;
    }, error : error =>{
      GlobalResourcesService.errorMessageHandeler(error);
    }});
  }
}
