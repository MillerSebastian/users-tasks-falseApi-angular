import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
import { UserApiService } from './api/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService = inject(UserApiService);
  private platformId = inject(PLATFORM_ID);
  private usersSignal = signal<User[]>([]);
  users = this.usersSignal.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    } else {
      this.loadInitialUsers();
    }
  }

  private loadUsers() {
    this.userApiService.getUsers().subscribe({
      next: (users) => this.usersSignal.set(users),
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loadInitialUsers();
      },
    });
  }

  private loadInitialUsers() {
    const initialUsers: User[] = [
      { id: 1, name: 'admin', email: 'admin@admin.task', role: '1' },
      { id: 2, name: 'sebastian', email: 'sebastian@user.task', role: '2' },
    ];
    this.usersSignal.set(initialUsers);
  }

  addUser(user: Omit<User, 'id'>) {
    this.userApiService.createUser(user).subscribe({
      next: (newUser) => this.usersSignal.update((users) => [...users, newUser]),
      error: (error) => console.error('Error al crear usuario:', error),
    });
  }

  updateUser(userId: number, updates: Partial<User>) {
    this.userApiService.updateUser(userId, updates).subscribe({
      next: (updatedUser) => {
        this.usersSignal.update((users) =>
          users.map((user) => (user.id === userId ? updatedUser : user))
        );
      },
      error: (error) => console.error('Error al actualizar usuario:', error),
    });
  }

  deleteUser(userId: number) {
    this.userApiService.deleteUser(userId).subscribe({
      next: () => this.usersSignal.update((users) => users.filter((user) => user.id !== userId)),
      error: (error) => console.error('Error al eliminar usuario:', error),
    });
  }

  getUserById(id: number): User | undefined {
    return this.users().find((user) => user.id === id);
  }

  private getNextId(): number {
    const users = this.users();
    return users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  }

  getRoles() {
    return [
      { id: '1', name: 'admin' },
      { id: '2', name: 'user' },
    ];
  }

  getRoleName(roleId: string): string {
    const roles = this.getRoles();
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : 'unknown';
  }
}
