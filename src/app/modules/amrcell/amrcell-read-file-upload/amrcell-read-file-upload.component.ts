import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';

@Component({
  selector: 'app-amrcell-read-file-upload',
  templateUrl: './amrcell-read-file-upload.component.html',
  styleUrls: ['./amrcell-read-file-upload.component.css']
})
export class AmrcellReadFileUploadComponent implements OnInit{

  selectedFile : any = [];
  loading : boolean = false;

  constructor(private readService : ReadService){}

  ngOnInit(): void {
  }

  fileChange(event : any){
    this.selectedFile = event.target.files;
    
  }
  result : any = [];
  async uploadClicked(){
    this.loading = true;
    this.result = [];
    for (let i = 0; i < this.selectedFile.length; i++) {
      let formData : FormData = new FormData();
      console.log(this.selectedFile[i]);
      formData.append('xmlFile', this.selectedFile[i]);
      this.readService.uploadFiles(formData).subscribe( {next: (success : any)=>{
        this.loading = false;
        let a : any= {};
        a.fileName = this.selectedFile[i].name;
        a.result = success.message;
        this.result.push(a);
        console.log(this.result);
      }, error: (error : any) =>{
        this.loading = false;
        let a : any= {};
        a.fileName = this.selectedFile[i].name;
        a.result = error.error.message;
        this.result.push(a);
        console.log(this.result);
      }});
    }
  }
}
