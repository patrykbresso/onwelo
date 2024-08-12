import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect, MatLabel } from '@angular/material/select';

@Component({
  selector: 'app-ui-dropdown-input',
  templateUrl: './ui-dropdown-input.component.html',
  imports: [
    MatFormField, 
    ReactiveFormsModule, 
    MatSelect, 
    MatOption, 
    MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UiDropdownInputComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  options = input.required<{ label: string; value: unknown }[]>();
}
