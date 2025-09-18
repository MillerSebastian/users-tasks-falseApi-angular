import { Component, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskEditedModal } from '../task-edited-modal/task-edited-modal';

interface TaskWithUser extends Task {
  userName: string;
  userEmail: string;
}

@Component({
  selector: 'app-task-user-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './task-user-list.html',
  styleUrl: './task-user-list.css',
})
export class TaskUserList {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  tasks = input<TaskWithUser[]>([]);
  displayedColumns: string[] = ['completed', 'title', 'description', 'user', 'actions'];

  getStatusClass(completed: boolean): string {
    return completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }

  getUserStatusClass(active: boolean): string {
    return active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  }

  toggleTaskCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(task: Task) {
    if (confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`)) {
      this.taskService.deleteTask(task.id);
    }
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskEditedModal, {
      width: '600px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(task.id, result);
      }
    });
  }
}
