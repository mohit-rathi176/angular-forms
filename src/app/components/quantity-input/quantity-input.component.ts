import { NgClass } from '@angular/common';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-quantity-input',
  imports: [ButtonModule, NgClass],
  templateUrl: './quantity-input.component.html',
  styleUrl: './quantity-input.component.css',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: QuantityInputComponent,
			multi: true
		}
	]
})
export class QuantityInputComponent implements ControlValueAccessor, OnInit {
	private readonly injector = inject(Injector);
	private ngControl!: NgControl | undefined;

	quantity: number = 0;
	onChange = (quantity: number) => {};
	onTouched = () => {};
	isDisabled: boolean = false;
	isTouched: boolean = false;

	ngOnInit(): void {
		this.ngControl = this.injector.get(NgControl);
		if (this.ngControl) this.ngControl.valueAccessor = this;
	}

	get isInvalid(): boolean {
		return (this.ngControl?.invalid && (this.ngControl?.touched || this.ngControl?.dirty)) ?? false;
	}

	increment(): void {
		if (this.isDisabled) return;
		this.markAsTouched();
		this.quantity += 1;
		this.onChange(this.quantity);
	}

	decrement(): void {
		if (this.quantity === 0 || this.isDisabled) return;
		this.markAsTouched();
		this.quantity -= 1;
		this.onChange(this.quantity);
	}

	/* interface methods start */

	// parent to child
	writeValue(quantity: number): void {
		if (this.ngControl?.touched === false) this.isTouched = false;
		this.quantity = quantity;
	}

	// parent to child
	// save the function passed from parent in child
	// call the saved function from child to notify parent
	registerOnChange(onChangeFn: any): void {
		this.onChange = onChangeFn;
	}

	// parent to child
	// save the function passed from parent in child
	// call the saved function from child to notify parent
	registerOnTouched(onTouchedFn: any): void {
		this.onTouched = onTouchedFn;
	}

	// parent to child
	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/* interface methods end */

	markAsTouched(): void {
		if (!this.isTouched) {
			this.isTouched = true;
			this.onTouched();
		}
	}
}
