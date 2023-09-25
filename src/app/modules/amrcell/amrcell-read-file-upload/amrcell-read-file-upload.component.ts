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
  uploadClicked(){
    this.loading = true;
    let formData : FormData = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append('xmlFile', this.selectedFile[i]);
    }
    this.readService.uploadFiles(formData).subscribe( {next: (success)=>{
      this.loading = false;
      console.log(success);
    }, error: (error) =>{
      this.loading = false;
      console.log(error);
    }})
  }
}
