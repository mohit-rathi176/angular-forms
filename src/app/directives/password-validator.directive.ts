import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: PasswordValidatorDirective,
			multi: true
		}
	]
})
export class PasswordValidatorDirective implements Validator {
	lowerCaseRegex: RegExp = /[a-z]/;
	upperCaseRegex: RegExp = /[A-Z]/;
	digitRegex: RegExp = /\d/;
	specialCharRegex: RegExp = /[^A-Za-z0-9 ]/;
	lengthRegex: RegExp = /^.{8,15}$/;
	
	validate(control: AbstractControl): ValidationErrors | null {
		const value = control.value;

		if (!value)
			return null;

		if (!this.lowerCaseRegex.test(value))
			return { password: { error: 'Password must contain a lower case alphabet.' } };

		if (!this.upperCaseRegex.test(value))
			return { password: { error: 'Password must contain an upper case alphabet.' } };

		if (!this.digitRegex.test(value))
			return { password: { error: 'Password must contain a digit.' } };

		if (!this.specialCharRegex.test(value))
			return { password: { error: 'Password must contain a special character.' } };

		if (!this.lengthRegex.test(value))
			return { password: { error: 'Password must be between 8 to 15 characters long.' } };

		return null;
	}
}
