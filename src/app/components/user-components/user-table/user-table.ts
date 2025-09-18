import { Component, input, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserEditedModal } from '../user-edited-modal/user-edited-modal';

@Component({
  selector: 'app-users-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UsersTable {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  // Input para recibir la lista de usuarios
  users = input<User[]>([]);

  // Columnas de la tabla
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  // Método para obtener el nombre del rol
  getRoleName(roleId: string): string {
    return this.userService.getRoleName(roleId);
  }

  // Método para editar usuario
  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditedModal, {
      width: '600px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.id, result);
      }
    });
  }

  // Método para eliminar usuario
  deleteUser(user: User) {
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${user.name}?`)) {
      this.userService.deleteUser(user.id);
    }
  }
}
