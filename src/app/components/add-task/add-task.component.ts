import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPriority, IStatus, ITaskCreate } from '../../models/interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/tasts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
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
})
export class TaskFormComponent implements OnInit {
  allAssignees: string[] = ['User1', 'User2', 'User3', 'User4'];

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    deadline: [null, Validators.required],
    priority: ['medium', Validators.required],
    status: ['todo', Validators.required],
    assignees: [[]],
  });

  constructor(
    private fb: FormBuilder,
    private tasksService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: ITaskCreate = {
        title: this.taskForm.value.title || ' ',
        description: this.taskForm.value.description || ' ',
        status: this.taskForm.value.status as IStatus,
        deadline: this.taskForm.value.deadline || new Date(),
        priority: this.taskForm.value.priority as IPriority,
        assignees: this.taskForm.value.assignees || [],
      };
      this.tasksService.createTask(newTask);
      this.router.navigate(['/board']);
    }
  }
}
