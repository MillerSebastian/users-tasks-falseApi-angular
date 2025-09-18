import { Component, inject, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaveButtonUser } from '../save-button-user/save-button-user';
import { UserRoleValidate } from '../user-role-validate/user-role-validate';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    SaveButtonUser,
    UserRoleValidate,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  userAdded = output<User>();
  form: FormGroup;
  selectedRole: string = '2';

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['2', [Validators.required]],
    });
  }

  onRoleChange(role: string) {
    this.selectedRole = role;
    this.form.patchValue({ role: role });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitForm();
  }

  onSaveClick() {
    this.submitForm();
  }

  private submitForm() {
    if (this.form.valid) {
      const userData = {
        name: this.form.value.name,
        email: this.form.value.email,
        role: this.selectedRole,
      };
      this.userService.addUser(userData);
      this.form.reset();
      this.selectedRole = '2';
    }
  }

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
