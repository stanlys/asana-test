import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IStatus } from '../../models/interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <form [formGroup]="filterForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Deadline</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="deadline" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          @for(status of statuses; track $index) {
          <mat-option [value]="status">{{ status }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Filter</button>
    </form>
  `,
  styles:
    ' form {display: flex; align-items: top; gap: 3px;} button {height: 56px;}',
})
export class TaskFilterComponent implements OnInit {
  filterForm = this.fb.group({
    deadline: [null],
    status: [''],
  });
  statuses: IStatus[] = ['todo', 'in-progress', 'done'];

  @Output() doFilter = new EventEmitter<{
    date?: Date | null;
    status?: IStatus | null;
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const filterValues = this.filterForm.value;
    this.doFilter.emit({
      date: this.filterForm.value.deadline,
      status: this.filterForm.value.status as IStatus,
    });
  }
}
