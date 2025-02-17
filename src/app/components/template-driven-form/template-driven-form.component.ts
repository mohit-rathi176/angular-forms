import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { IUser } from '../../models/IUser.model';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';

@Component({
  selector: 'app-template-driven-form',
  imports: [
		FormsModule,
		InputTextModule,
		InputNumberModule,
		PasswordModule,
		ButtonModule,
		SelectButtonModule,
		DatePickerModule,
		SelectModule,
		PasswordValidatorDirective,
		EmailValidatorDirective
	],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.css'
})
export class TemplateDrivenFormComponent {
	user: IUser = {
		firstName: null,
		lastName: null,
		gender: 'male',
		dateOfBirth: null,
		age: null,
		email: null,
		password: null,
		address: {
			street: null,
			city: null,
			state: null,
			postalCode: null
		}
	}
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

	calculateAge(): void {
		let dob = this.user.dateOfBirth;
		if (!dob) {
			this.user.age = null;
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

		this.user.age = age;
	}

	onStateChange(): void {
		const state = this.user.address.state;
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
	}

	resetForm(form: NgForm): void {
		form.reset({
			gender: 'male'
		});
	}

	onSubmit(form: NgForm): void {
		console.log(form);
		console.log(form.value);
	}
}
