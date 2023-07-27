import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-htadmin',
  templateUrl: './htadmin.component.html',
  styleUrls: ['./htadmin.component.css']
})
export class HTAdminComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    console.log("inside htadmin");
  }
  
}
