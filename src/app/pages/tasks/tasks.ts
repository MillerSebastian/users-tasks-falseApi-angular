import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskForm } from '../../components/task-components/task-form/task-form';
import { TaskUserList } from '../../components/task-components/task-user-list/task-user-list';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  imports: [MatIconModule, MatDialogModule, TaskForm, TaskUserList],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private taskService = inject(TaskService);
  tasksWithUsers = this.taskService.tasksWithUsers;
  taskStats = this.taskService.getTaskStats();

  onTaskAdded(task: Task) {
    console.log('Tarea agregada:', task);
  }
}
