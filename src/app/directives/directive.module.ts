import { NgModule } from "@angular/core";
import { MaxValidatorDirective } from "./max-validator.directive";
import { MinValidatorDirective } from "./min-validator.directive";

@NgModule({
    declarations: [
        MinValidatorDirective,
        MaxValidatorDirective
    ],
    exports:[
        MinValidatorDirective,
        MaxValidatorDirective
    ],
})
export class DirectiveModule { }