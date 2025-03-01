import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [MenubarModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	// private readonly router = inject(Router);

	menuItems: MenuItem[] = [
		{
			label: 'Template Driven Form',
			route: 'template-driven-form'
		},
		{
			label: 'Reactive Form',
			route: 'reactive-form'
		},
		{
			label: 'Control Value Accessor',
			route: 'control-value-accessor'
		},
		{
			label: 'Dynamic Form',
			route: 'dynamic-form'
		}
	];
}
