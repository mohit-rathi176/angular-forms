import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { delay, map, Observable, of, Subscription } from 'rxjs';

interface IUserForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<'male' | 'female'>;
  dateOfBirth: FormControl<Date | null>;
  age: FormControl<number | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  skills: FormArray<FormControl<string | null>>;
  address: FormGroup<IAddressForm>;
}

interface IAddressForm {
  street: FormControl<string | null>;
	city: FormControl<string | null>;
	state: FormControl<string | null>;
	postalCode: FormControl<string | null>;
}

@Component({
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    SelectButtonModule,
    DatePickerModule,
    SelectModule
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  userForm!: FormGroup;
  genderOptions = [
		{
			label: 'Male',
			value: 'male'
		},
		{
			label: 'Female',
			value: 'female'
		}
	];
  stateOptions = [
		{
			label: 'Gujarat',
			value: 'gujarat'
		},
		{
			label: 'Maharashtra',
			value: 'maharashtra'
		},
		{
			label: 'Rajasthan',
			value: 'rajasthan'
		}
	];
  cityOptions: { label: string; value: string }[] = [];
  maxDate = new Date();
  emailRegex: RegExp = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,})+$/;
  lowerCaseRegex: RegExp = /[a-z]/;
	upperCaseRegex: RegExp = /[A-Z]/;
	digitRegex: RegExp = /\d/;
	specialCharRegex: RegExp = /[^A-Za-z0-9 ]/;
	lengthRegex: RegExp = /^.{8,15}$/;
  subscriptions: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.subscriptions.map(s => s?.unsubscribe());
    });
  }

  ngOnInit(): void {
    this.prepareForm();

    this.subscriptions.push(this.userForm.get('dateOfBirth')?.valueChanges?.subscribe({
      next: (dob: Date | null) => {
        if (!dob) {
          this.userForm.get('age')?.setValue(null);
          return;
        }
    
        const today = new Date();
    
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
    
        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
    
        this.userForm.get('age')?.setValue(age);
      }
    })!);

    this.subscriptions.push(this.userForm.get('address.state')?.valueChanges?.subscribe({
      next: (state: string | null) => {
        switch (state) {
          case 'gujarat':
            this.cityOptions = [
              {
                label: 'Ahmedabad',
                value: 'ahmedabad'
              },
              {
                label: 'Gandhinagar',
                value: 'gandhinagar'
              },
              {
                label: 'Surat',
                value: 'surat'
              }
            ];
            break;
          case 'maharashtra':
            this.cityOptions = [
              {
                label: 'Mumbai',
                value: 'mumbai'
              },
              {
                label: 'Pune',
                value: 'pune'
              },
              {
                label: 'Nagpur',
                value: 'nagpur'
              }
            ];
            break;
          case 'rajasthan':
            this.cityOptions = [
              {
                label: 'Jaipur',
                value: 'jaipur'
              },
              {
                label: 'Jodhpur',
                value: 'jodhpur'
              },
              {
                label: 'Kota',
                value: 'kota'
              }
            ];
            break;
          default:
            this.cityOptions = [];
        }
        this.userForm.get('address.city')?.setValue(null);
      }
    })!);
  }

  prepareForm(): void {
    this.userForm = this.fb.group<IUserForm>({
      firstName: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
      lastName: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
      gender: this.fb.nonNullable.control<'male' | 'female'>('male'),
      dateOfBirth: this.fb.control<Date | null>(null, Validators.required),
      age: this.fb.control<number | null>(null),
      email: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(this.emailRegex)], this.emailValidatorAsync),
      password: this.fb.control<string | null>(null, [Validators.required, this.passwordValidator.bind(this)]),
      skills: this.fb.array<FormControl<string | null>>([]),
      address: this.fb.group<IAddressForm>({
        street: this.fb.control<string | null>(null, Validators.required),
        city: this.fb.control<string | null>(null, Validators.required),
        state: this.fb.control<string | null>(null, Validators.required),
        postalCode: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
      })
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
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

  emailValidatorAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value === 'test@example.com').pipe(
      map((isTaken) => isTaken ? { email: true } : null),
      delay(2000)
    );
  }

  resetForm(): void {
    this.userForm.reset();
  }

  submitForm(): void {
    console.log(this.userForm);
    console.log(this.userForm.value);
  }
}
