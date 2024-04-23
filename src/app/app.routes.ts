import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TaskFormComponent } from './components/add-task/add-task.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'board/edit/:id', component: TaskEditComponent },
];
