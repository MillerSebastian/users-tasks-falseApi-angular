import { Component, inject, signal, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';
import { UserForm } from '../../components/user-components/user-form/user-form';
import { UsersTable } from '../../components/user-components/user-table/user-table';
import { TaskForm } from '../../components/task-components/task-form/task-form';
import { TaskUserList } from '../../components/task-components/task-user-list/task-user-list';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user.model';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    DecimalPipe,
    UserForm,
    UsersTable,
    TaskForm,
    TaskUserList,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private userService = inject(UserService);
  private taskService = inject(TaskService);
  users = this.userService.users;
  tasksWithUsers = this.taskService.tasksWithUsers;
  taskStats = this.taskService.getTaskStats();
  activeTab = signal(0);

  ngOnInit() {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab !== null) {
      this.activeTab.set(parseInt(savedTab, 10));
    }
  }

  onUserAdded(user: User) {
    console.log('Usuario agregado:', user);
  }

  onTaskAdded(task: Task) {
    console.log('Tarea agregada:', task);
  }

  onTabChange(index: number) {
    this.activeTab.set(index);
    localStorage.setItem('activeTab', index.toString());
  }
}
