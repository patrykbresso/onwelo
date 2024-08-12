import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { TableColumn } from '../../../core/models/table-column';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    MatButton
  ]
})
export class UiTableComponent<T> {
  title = input.required<string>();
  columns = input.required<TableColumn[]>();
  dataSource = input.required<T[]>();
  columnHeaders = computed(() => this.columns().map((column: TableColumn) => column.name))

  addParticipantClick = output<void>();

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  onAddParticipantButtonClick(): void {
    this.addParticipantClick.emit();
  }
}
