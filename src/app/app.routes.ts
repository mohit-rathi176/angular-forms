import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'template-driven-form',
		pathMatch: 'full'
	},
	{
		path: 'template-driven-form',
		loadComponent: () => import('./components/template-driven-form/template-driven-form.component').then(c => c.TemplateDrivenFormComponent)
	},
	{
		path: 'reactive-form',
		loadComponent: () => import('./components/reactive-form/reactive-form.component').then(c => c.ReactiveFormComponent)
	},
	{
		path: 'control-value-accessor',
		loadComponent: () => import('./components/custom-form-control/custom-form-control.component').then(c => c.CustomFormControlComponent)
	},
	{
		path: 'dynamic-form',
		loadComponent: () => import('./components/dynamic-form-parent/dynamic-form-parent.component').then(c => c.DynamicFormParentComponent)
	}
];
