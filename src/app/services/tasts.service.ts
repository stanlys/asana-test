import { Injectable } from '@angular/core';
import { IStatus, ITask, ITaskCreate } from '../models/interfaces';
import { LocalStorageService } from './local-storage.service';
import { KEY_BASE } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: ITask[] = [];

  constructor(private storage: LocalStorageService) {}

  private _getTasks = () => (this.tasks = this.storage.getItem(KEY_BASE) || []);

  private _saveTasks = () => this.storage.setItem(KEY_BASE, this.tasks);

  createTask(task: ITaskCreate): void {
    this._getTasks();
    console.log(this.tasks);
    const newTask: ITask = {
      id: `${Date.now()}`,
      ...task,
    };
    this.tasks.push(newTask);
    this._saveTasks();
  }

  getAllTasks(): ITask[] {
    this._getTasks();
    return this.tasks;
  }

  updateTask(id: string, updatedTask: ITaskCreate): void {
    this._getTasks();
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        id,
        ...updatedTask,
      };
    }
    this._saveTasks();
  }

  deleteTask(id: string): void {
    this._getTasks();
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._saveTasks();
  }

  getTaskById(id: string): ITask | undefined {
    this._getTasks();
    return this.tasks.find((task) => task.id === id);
  }

  findTaskByText(text: string): ITask[] {
    const lowerSubstring = text.toLowerCase();

    return this.tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(lowerSubstring) ||
        task.description.toLowerCase().includes(lowerSubstring) ||
        task.assignees.some((assignee) =>
          assignee.toLowerCase().includes(lowerSubstring)
        )
      );
    });
  }

  findTasksByStatus(status: IStatus): ITask[] {
    return this.tasks.filter((task) => task.status === status);
  }

  filterTasks(filterDate?: Date, filterStatus?: IStatus): ITask[] {
    this._getTasks();
    return this.tasks.filter((task) => {
      console.log(task.deadline, filterDate);
      const dateMatch = filterDate
        ? this.isSameDay(new Date(task.deadline), filterDate)
        : true;

      const statusMatch = filterStatus ? task.status === filterStatus : true;
      return dateMatch && statusMatch;
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}
