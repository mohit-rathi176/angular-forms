import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value === 'test@example.com').pipe(
      map((isTaken) => isTaken ? { email: true } : null),
      delay(2000)
    );
  }
}
