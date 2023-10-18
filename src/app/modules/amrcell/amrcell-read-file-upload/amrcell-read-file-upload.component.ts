import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read-service';
import { GlobalResourcesService } from 'src/app/utility/global-resources.service';

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
  uploadClicked(){
    this.loading = true;
    this.result = [];
    for (let i = 0; i < this.selectedFile.length; i++) {
      let formData : FormData = new FormData();
      formData.append('xmlFile', this.selectedFile[i]);
      this.readService.uploadFiles(formData).subscribe( {next: (success : any)=>{
        this.loading = false;
        this.result.push(success.message);
        console.log(success);
      }, error: (error : any) =>{
        this.loading = false;
        this.result.push(error.error.message);
      }})
    }
    console.log(this.result)
  }
}
