import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../models/task.model';
import { UserService } from './user.service';
import { TaskApiService } from './api/task-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskApiService = inject(TaskApiService);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  private tasksSignal = signal<Task[]>([]);
  tasks = this.tasksSignal.asReadonly();

  tasksWithUsers = computed(() => {
    const tasks = this.tasks();
    const users = this.userService.users();
    return tasks.map((task) => {
      const user = users.find((u) => u.id === task.userId);
      return {
        ...task,
        userName: user ? user.name : 'Usuario no encontrado',
        userEmail: user ? user.email : 'N/A',
      };
    });
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks();
    } else {
      this.loadInitialTasks();
    }
  }

  private loadTasks() {
    this.taskApiService.getTasks().subscribe({
      next: (tasks) => this.tasksSignal.set(tasks),
      error: (error) => {
        console.error('Error al cargar tareas:', error);
        this.loadInitialTasks();
      },
    });
  }

  private loadInitialTasks() {
    const initialTasks: Task[] = [
      {
        id: 1,
        title: 'Implementar autenticación',
        description: 'Crear sistema de login y registro de usuarios',
        completed: false,
        userId: 1,
      },
      {
        id: 2,
        title: 'Diseñar interfaz de usuario',
        description: 'Crear mockups y prototipos de la aplicación',
        completed: true,
        userId: 2,
      },
    ];
    this.tasksSignal.set(initialTasks);
  }

  addTask(task: Omit<Task, 'id'>) {
    this.taskApiService.createTask(task).subscribe({
      next: (newTask) => this.tasksSignal.update((tasks) => [...tasks, newTask]),
      error: (error) => console.error('Error al crear tarea:', error),
    });
  }

  updateTask(taskId: number, updates: Partial<Task>) {
    this.taskApiService.updateTask(taskId, updates).subscribe({
      next: (updatedTask) => {
        this.tasksSignal.update((tasks) =>
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      },
      error: (error) => console.error('Error al actualizar tarea:', error),
    });
  }

  deleteTask(taskId: number) {
    this.taskApiService.deleteTask(taskId).subscribe({
      next: () => this.tasksSignal.update((tasks) => tasks.filter((task) => task.id !== taskId)),
      error: (error) => console.error('Error al eliminar tarea:', error),
    });
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }

  getTasksByUserId(userId: number) {
    return this.tasks().filter((task) => task.userId === userId);
  }

  private getNextId(): number {
    const tasks = this.tasks();
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }

  toggleTaskCompletion(taskId: number) {
    const task = this.getTaskById(taskId);
    if (task) {
      this.updateTask(taskId, { completed: !task.completed });
    }
  }

  getTaskStats() {
    const tasks = this.tasks();
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  }
}
