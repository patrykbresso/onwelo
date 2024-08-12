import { ChangeDetectionStrategy, Component, Inject, Signal, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-ui-add-participant',
  templateUrl: './ui-add-participant.component.html',
  styleUrl: './ui-add-participant.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormField, 
    ReactiveFormsModule, 
    MatLabel,
    MatError,
    MatInput,
    MatButton
  ]
})
export class UiAddParticipantComponent {
  label: WritableSignal<string | null> = signal(null);
  nameControl: Signal<FormControl<string | null>> = signal(new FormControl<string | null>(null, [Validators.required]));

  constructor(
    private readonly _dialogRef: MatDialogRef<UiAddParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: { title: string }
  ) {
    this.label.set(_data.title)
  }

  onAddButtonClick(): void {
    this._dialogRef.close(this.nameControl().value);
  }
}
