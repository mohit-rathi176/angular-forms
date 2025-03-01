import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ActionButtonName, FormControlType, IFormGroup } from '../../models/IDynamicForm';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-parent',
  imports: [DynamicFormComponent],
  templateUrl: './dynamic-form-parent.component.html',
  styleUrl: './dynamic-form-parent.component.css'
})
export class DynamicFormParentComponent implements OnInit {
	dynamicFormConfig!: IFormGroup;
	countries = [
		{
			label: 'India',
			value: 'india'
		},
		{
			label: 'Canade',
			value: 'canada'
		},
		{
			label: 'Russia',
			value: 'russia'
		}
	];
	hobbies = [
		{
			label: 'Sports',
			value: 'sports'
		},
		{
			label: 'Dancing',
			value: 'dancing'
		},
		{
			label: 'Singing',
			value: 'singing'
		}
	];

	ngOnInit(): void {
		this.prepareDynamicFormConfig();
	}

	prepareDynamicFormConfig() {
		this.dynamicFormConfig = {
			title: 'Dynamic Form',
			controls: [
				{
					formControlType: FormControlType.InputText,
					formControlName: 'firstName',
					id: 'firstName',
					label: 'First Name',
					type: 'text',
					placeholder: 'Enter your first name',
					validators: [Validators.required]
				},
				{
					formControlType: FormControlType.InputText,
					formControlName: 'lastName',
					id: 'lastName',
					label: 'Last Name',
					type: 'text',
					placeholder: 'Enter your last name',
					validators: [Validators.required]
				},
				{
					formControlType: FormControlType.TextArea,
					formControlName: 'about',
					id: 'about',
					label: 'About Me',
					placeholder: 'Tell us something about yourself',
					isAutoResize: true
				},
				{
					formControlType: FormControlType.InputText,
					formControlName: 'magicNumber',
					id: 'magicNumber',
					label: 'Number',
					type: 'number',
					placeholder: 'Number between 3 and 7',
					validators: [Validators.required, Validators.min(3), Validators.max(7)]
				},
				{
					formControlType: FormControlType.Radio,
					formControlName: 'gender',
					id: 'gender',
					label: 'Gender',
					validators: [Validators.required],
					options: [
						{
							id: 'male',
							label: 'Male',
							value: 'male'
						},
						{
							id: 'female',
							label: 'Female',
							value: 'female'
						}
					]
				},
				{
					formControlType: FormControlType.Checkbox,
					formControlName: 'subjects',
					id: 'subjects',
					label: 'Subjects',
					validators: [Validators.required],
					options: [
						{
							id: 'physics',
							label: 'Physics',
							value: 'physics'
						},
						{
							id: 'chemistry',
							label: 'Chemistry',
							value: 'chemistry'
						},
						{
							id: 'maths',
							label: 'Maths',
							value: 'maths'
						}
					]
				},
				{
					formControlType: FormControlType.DatePicker,
					formControlName: 'dateOfBirth',
					id: 'dateOfBirth',
					label: 'Date of Birth',
					placeholder: 'Enter your date of birth',
					dateFormat: 'dd/mm/yy',
					validators: [Validators.required]
				},
				{
					formControlType: FormControlType.Select,
					formControlName: 'country',
					id: 'country',
					label: 'Country',
					placeholder: 'Select your country',
					options: this.countries,
					optionLabel: 'label',
					optionValue: 'value',
					isShowClear: true,
					validators: [Validators.required]
				},
				{
					formControlType: FormControlType.MultiSelect,
					formControlName: 'hobbies',
					id: 'hobbies',
					label: 'Hobbies',
					placeholder: 'Select your hobbies',
					options: this.hobbies,
					optionLabel: 'label',
					optionValue: 'value',
					maxSelectedLabels: 1,
					isShowClear: true,
					validators: [Validators.required]
				}
			],
			actionButtons: [
				{
					actionButtonName: ActionButtonName.Cancel,
					type: 'button',
					label: 'Cancel',
					severity: 'secondary'
				},
				{
					actionButtonName: ActionButtonName.Save,
					type: 'submit',
					label: 'Save',
					severity: 'success'
				}
			]
		};
	}
}
