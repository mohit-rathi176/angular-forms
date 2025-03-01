import { ValidatorFn } from "@angular/forms";

export interface IFormGroup {
	title: string;
	controls: IFormControl[];
	actionButtons: IActionButton[];
}

export interface IBaseFormControl {
	label: string;
	formControlName: string;
	id: string;
	placeholder?: string;
	validators?: ValidatorFn[];
}

export type IFormControl = 
	| ITextControl
	| ITextAreaControl
	| ICheckboxControl
	| IRadioControl
	| ISelectControl
	| IMultiSelectControl
	| IDatePickerControl;

export interface ITextControl extends IBaseFormControl {
	formControlType: FormControlType.InputText;
	type?: 'text' | 'email' | 'password' | 'number';
}

export interface ITextAreaControl extends IBaseFormControl {
	formControlType: FormControlType.TextArea;
	isAutoResize?: boolean;
}

export interface IBaseOption {
	id: string;
	value: any;
	label: string;
}

export interface ICheckboxControl extends IBaseFormControl {
	formControlType: FormControlType.Checkbox;
	options: ICheckboxOption[];
}

export interface ICheckboxOption extends IBaseOption {
	
}

export interface IRadioControl extends IBaseFormControl {
	formControlType: FormControlType.Radio;
	options: IRadioOption[];
}

export interface IRadioOption extends IBaseOption {
	
}

export interface IBaseSelectControl {
	options: any[];
	optionLabel: string;
	optionValue: string;
	isFilter?: boolean;
	filterBy?: string;
	isShowClear?: boolean;
}

export interface ISelectControl extends IBaseFormControl, IBaseSelectControl {
	formControlType: FormControlType.Select;
	isCheckmark?: boolean;
	isEditable?: boolean;
}

export interface IMultiSelectControl extends IBaseFormControl, IBaseSelectControl {
	formControlType: FormControlType.MultiSelect;
	display?: 'comma' | 'chip';
	maxSelectedLabels?: number;
}

export interface IDatePickerControl extends IBaseFormControl {
	formControlType: FormControlType.DatePicker;
	dateFormat?: string;
	minDate?: Date;
	maxDate?: Date;
	selectionMode?: 'single' | 'multiple' | 'range';
	isShowButtonBar?: boolean;
	isShowTime?: boolean;
	isTimeOnly?: boolean;
	hourFormat?: '12' | '24';
}

export enum FormControlType {
	InputText = 'InputText',
	TextArea = 'TextArea',
	Checkbox = 'Checkbox',
	Radio = 'Radio',
	Select = 'Select',
	MultiSelect = 'MultiSelect',
	DatePicker = 'DatePicker'
}

export interface IActionButton {
	actionButtonName: ActionButtonName;
	label: string;
	icon?: string;
	iconPos?: 'top' | 'bottom' | 'left' | 'right';
	type: 'button' | 'submit';
	severity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
}

export enum ActionButtonName {
	Save = 'Save',
	Cancel = 'Cancel'
}