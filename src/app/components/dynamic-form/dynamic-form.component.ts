import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActionButtonName, FormControlType, IActionButton, IFormControl, IFormGroup } from '../../models/IDynamicForm';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dynamic-form',
  imports: [
		ReactiveFormsModule,
		InputTextModule,
		TextareaModule,
		CheckboxModule,
		RadioButtonModule,
		DatePickerModule,
		SelectModule,
		MultiSelectModule,
		ButtonModule
	],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
	dynamicFormConfig = input.required<IFormGroup>();
	dynamicFormGroup!: FormGroup;

	ngOnInit(): void {
		this.prepareDynamicFormGroup();
	}

	get formControlType() {
		return FormControlType;
	}

	get actionButtonName() {
		return ActionButtonName;
	}

	prepareDynamicFormGroup(): void {
		const formGroup: { [key: string]: FormControl } = {};
		
		this.dynamicFormConfig().controls.forEach((control: IFormControl) => {
			formGroup[control.formControlName] = new FormControl(null, control.validators ? [...control.validators] : []);
		});

		this.dynamicFormGroup = new FormGroup(formGroup);
	}

	onClickActionButton(actionButton: IActionButton): void {
		switch (actionButton.actionButtonName) {
			case ActionButtonName.Cancel:
				this.dynamicFormGroup.reset();
				break;
			case ActionButtonName.Save:
				console.log(this.dynamicFormGroup.value);
				break;
		}
	}
}
