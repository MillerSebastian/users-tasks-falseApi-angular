import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserRoleValidate } from '../user-role-validate/user-role-validate';

@Component({
  selector: 'app-user-edited-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoleValidate,
  ],
  templateUrl: './user-edited-modal.html',
  styleUrl: './user-edited-modal.css',
})
export class UserEditedModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserEditedModal>);
  private userService = inject(UserService);

  // Datos del usuario a editar
  user = inject<User>(MAT_DIALOG_DATA);

  // Formulario reactivo
  form: FormGroup;

  // Rol seleccionado
  selectedRole: string = '2';

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['2', [Validators.required]],
    });
  }

  ngOnInit() {
    // Cargar datos del usuario en el formulario
    this.selectedRole = this.user.role;
    this.form.patchValue({
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
    });
  }

  // Método para manejar cambio de rol
  onRoleChange(role: string) {
    this.selectedRole = role;
    this.form.patchValue({ role: role });
  }

  // Método para guardar cambios
  onSave() {
    if (this.form.valid) {
      const updatedUser = {
        ...this.user,
        ...this.form.value,
        role: this.selectedRole,
      };
      this.dialogRef.close(updatedUser);
    }
  }

  // Método para cancelar
  onCancel() {
    this.dialogRef.close();
  }

  // Getters para validaciones
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get role() {
    return this.form.get('role');
  }
}
