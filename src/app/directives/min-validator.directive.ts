// https://stackoverflow.com/questions/42851473/angular2-declaring-a-directives-selector-to-require-a-text-input
import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
  
})
export class MinValidatorDirective implements Validator {
  @Input() min!: number | string;

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {
    const currentValue = control.value;
    if(!currentValue || !this.min){ return null; }
    
    return currentValue >= this.min ? null : {
      min: {
        valid: false,
        min: this.min,
        actualValue: currentValue
      }
    }
  }
}