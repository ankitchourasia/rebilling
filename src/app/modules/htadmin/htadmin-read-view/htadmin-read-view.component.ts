import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';

@Component({
  selector: 'app-htadmin-read-view',
  templateUrl: './htadmin-read-view.component.html',
  styleUrls: ['./htadmin-read-view.component.css']
})
export class HTAdminReadViewComponent implements OnInit {

  constructor(private readService : ReadService){
  }

  ngOnInit(): void {
  }
}
