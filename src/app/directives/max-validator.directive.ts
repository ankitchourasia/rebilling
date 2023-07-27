import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[max]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator {
  @Input() max!: number | string;

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {
    const currentValue = control.value;
    if(!currentValue || !this.max){
      return null;
    }
    return currentValue <= this.max ? null : {
      max: {
        valid: false,
        max: this.max,
        actualValue: currentValue
      }
    };
  }
}