export interface IFormControl {
	label: string;
	formControlName: string;
	id: string;
	placeholder?: string;
	isDisabled?: boolean;
}

export interface ITextControl extends IFormControl {
	type?: 'text' | 'email' | 'password';
}

export interface ITextareaControl extends IFormControl {
	isAutosize?: boolean;
}

export interface ICheckboxControl extends IFormControl {
	options: ICheckboxOption[];
}

export interface ICheckboxOption {
	id: string;
	value: any;
	isDisabled?: boolean;
}

export interface ISelectControl extends IFormControl {
	options: any[];
	optionLabel: string;
	optionValue: string;
	isCheckmark?: boolean;
	isEditable?: boolean;
	isFilter?: boolean;
	filterBy?: string;
	isShowClear?: boolean;
}

export interface IMultiSelectControl extends IFormControl {
	options: any[];
	optionLabel: string;
	optionValue: string;
	isCheckmark?: boolean;
	isEditable?: boolean;
	isFilter?: boolean;
	filterBy?: string;
	isShowClear?: boolean;
	display?: 'comma' | 'chip';
	maxSelectedLabels?: number;
}

export interface IDatePickerControl extends IFormControl {
	dateFormat?: string;
	minDate?: Date;
	maxDate?: Date;
	selectionMode?: 'single' | 'multiple' | 'range';
	isShowButtonBar?: boolean;
	isShowTime?: boolean;
	isTimeOnly?: boolean;
	hourFormat?: number;
}