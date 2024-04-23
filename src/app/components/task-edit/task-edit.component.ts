import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/tasts.service';
import { ALLASSIGNEES } from '../../models';
import { IPriority, IStatus, ITaskCreate } from '../../models/interfaces';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    deadline: [new Date(), Validators.required],
    priority: ['medium', Validators.required],
    status: ['todo', Validators.required],
    assignees: [EMPTY],
  });

  taskId: string | null = null;

  allAssignees = ALLASSIGNEES;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    console.log(this.taskId);
    if (!this.taskId) return;
    const task = this.taskService.getTaskById(this.taskId);
    if (task) {
      this.taskForm.controls.title.setValue(task.title);
      this.taskForm.controls.deadline.setValue(new Date(task.deadline));
      this.taskForm.controls.description.setValue(task.description);
      this.taskForm.controls.status.setValue(task.status);
      this.taskForm.controls.priority.setValue(task.priority);
      this.taskForm.controls.assignees.setValue(task.assignees);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.taskId) {
      const newTask: ITaskCreate = {
        title: this.taskForm.value.title || ' ',
        description: this.taskForm.value.description || ' ',
        status: this.taskForm.value.status as IStatus,
        deadline: this.taskForm.value.deadline || new Date(),
        priority: this.taskForm.value.priority as IPriority,
        assignees: this.taskForm.value.assignees || [],
      };
      this.taskService.updateTask(this.taskId, newTask);
      this.router.navigate(['/board']);
    }
  }
}

const EMPTY: string[] = [];
