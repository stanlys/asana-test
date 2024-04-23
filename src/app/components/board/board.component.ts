import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskService } from '../../services/tasts.service';
import { IStatus, ITask } from '../../models/interfaces';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    TaskFilterComponent,
    MatInputModule,
    RouterLink,
    FormsModule,
    TaskCardComponent,
    MatIconModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getAllTasks();
  }

  public tasks: ITask[] = [];

  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef;

  doFilter(e: { date?: Date | null; status?: IStatus | null }): void {
    e.date = (e.date as Date) ?? undefined;
    e.status = e.status || undefined;
    this.tasks = this.tasksService.filterTasks(e.date, e.status);
  }

  onDeleteTask(id: string): void {
    this.tasksService.deleteTask(id);
    this.tasks = this.tasksService.getAllTasks();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput?.nativeElement, 'input')
      .pipe(
        debounceTime<any>(500),
        map((event: Event) => (event.target as HTMLInputElement).value)
      )
      .subscribe((value) => {
        this.tasks = this.tasksService.findTaskByText(value);
      });
  }
}
