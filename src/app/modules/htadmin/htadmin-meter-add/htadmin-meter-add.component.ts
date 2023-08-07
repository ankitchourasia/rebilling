import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MeterService } from 'src/app/services/meter-service';

@Component({
  selector: 'app-htadmin-meter-add',
  templateUrl: './htadmin-meter-add.component.html',
  styleUrls: ['./htadmin-meter-add.component.css']
})
export class HTAdminMeterAddComponent implements OnInit{
  
  meterMakes = [];
  categorires = ["MAIN", "CHECK", "STANDBY"];
  types = ["ABT", "NON-ABT"];
  meterGroups = ["WIND", "SOLAR", "BIO"];
  meterPhases = ["SINGLE PHASE", "THREE PHASE"];
  meterCTRs = [];
  meterPTRs = [];
  meterMECTRs = [];
  meterMEPTRs = [];
  meterDMFs = [];
  d : Date = new Date();
  loading : boolean =  false;

  constructor(private meterService : MeterService){
  }

  ngOnInit(): void {
    this.getMeterMakes();
    this.getMeterCTR();
    this.getMeterPTR();
    this.getMeterMECTR();
    this.getMeterMEPTR();
    this.getMeterDMF();
  }


  onSubmit(form : NgForm) : void{
    this.loading = true;
    let meterToCreate : any = Object.assign({}, form.form.value);
    meterToCreate['dialBmf'] = meterToCreate.dialBmf.capacity;
    meterToCreate['meCtr'] = meterToCreate.meCtr.capacity;
    meterToCreate['mePtr'] = meterToCreate.mePtr.capacity;
    meterToCreate['meterCtr'] = meterToCreate.meterCtr.capacity;
    meterToCreate['meterPtr'] = meterToCreate.meterPtr.capacity;
    this.meterService.createMeter(meterToCreate).subscribe({
      next: () =>{
        this.loading = false;
        alert("Meter added successfully.");
        form.reset();
      },
      error: (error) =>{
        this.loading = false;
        console.log(error);
        alert("Unable to add meter.");
      }

    })
  }

  getMeterMakes(){
    this.meterService.getMeterMakes().subscribe(success =>{
      this.meterMakes = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  getMeterCTR(){
    this.meterService.getMeterCTR().subscribe(success =>{
      this.meterCTRs = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  getMeterPTR(){
    this.meterService.getMeterPTR().subscribe(success =>{
      this.meterPTRs = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  getMeterMECTR(){
    this.meterService.getMeterMECTR().subscribe(success =>{
      this.meterMECTRs = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  getMeterMEPTR(){
    this.meterService.getMeterMEPTR().subscribe(success =>{
      this.meterMEPTRs = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  getMeterDMF(){
    this.meterService.getMeterDMF().subscribe(success =>{
      this.meterDMFs = <any>success;
    }, error =>{
      console.log(error);
    });
  }

  calculateMF(form : NgForm){
    console.log(form);
    let data = form.form.value;
    if(data.meterCtr && data.meterPtr && data.mePtr && data.meCtr && data.dialBmf){
      console.log(data.meterCtr.value, data.meterPtr.value);
      let temp = eval(data.meterCtr.value) * eval(data.meterPtr.value);
      let temp2 = eval(data.meCtr.value) * eval(data.mePtr.value) * eval(data.dialBmf.value);
      let mf = (temp/temp2);
      console.log(temp, temp2, Math.round((mf * 100)/100));
      form.controls['mf'].patchValue(""+mf);
    }
  }

}
