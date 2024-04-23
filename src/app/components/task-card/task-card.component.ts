import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ITask } from '../../models/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    DatePipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    TaskFilterComponent,
  ],
  providers: [],
})
export class TaskCardComponent {
  @Input() task!: ITask;

  @Output() onDeleteTask = new EventEmitter<string>();

 


}
