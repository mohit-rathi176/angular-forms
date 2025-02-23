import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { QuantityInputComponent } from "../quantity-input/quantity-input.component";

@Component({
  selector: 'app-custom-form-control',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, QuantityInputComponent],
  templateUrl: './custom-form-control.component.html',
  styleUrl: './custom-form-control.component.css'
})
export class CustomFormControlComponent implements OnInit {
	private readonly fb = inject(FormBuilder);

	productForm!: FormGroup;

	ngOnInit(): void {
		this.prepareForm();
	}

	prepareForm(): void {
		this.productForm = this.fb.group({
			productName: this.fb.control(null, Validators.required),
			quantity: this.fb.control(0, [Validators.required, Validators.max(5)])
		});
	}

	toggleQuantityDisability(): void {
		const quantityControl = this.productForm.get('quantity');
		if (quantityControl?.disabled) {
			quantityControl?.enable();
		} else {
			quantityControl?.disable();
		}
	}

	toggleProductNameDisability(): void {
		const productNameControl = this.productForm.get('productName');
		if (productNameControl?.disabled) {
			productNameControl?.enable();
		} else {
			productNameControl?.disable();
		}
	}

	resetForm(): void {
		this.productForm.reset({
			productName: null,
			quantity: 0
		});
	}

	submitForm(): void {
		console.log(this.productForm.value);
	}
}
