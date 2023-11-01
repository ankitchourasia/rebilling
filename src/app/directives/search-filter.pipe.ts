import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'searchFilter',
    standalone : true
  })
  export class SearchFilterPipe implements PipeTransform {
  
    constructor() { }
    transform(value: any, args: string) {
        if(!value){
            return null;
        }
        if(!args){
            return value;
        }
        args = args?.toLowerCase();
        return value.filter((element : any)=>{
            return JSON.stringify(element).toLowerCase().includes(args);
        })
    }
    
  }