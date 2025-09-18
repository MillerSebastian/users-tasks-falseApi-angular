import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tasks } from './pages/tasks/tasks';
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'task-list',
    component: Tasks,
  },
];
