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
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-task-edited-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './task-edited-modal.html',
  styleUrl: './task-edited-modal.css',
})
export class TaskEditedModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskEditedModal>);
  private userService = inject(UserService);
  task = inject<Task>(MAT_DIALOG_DATA);
  form: FormGroup;
  users = this.userService.users;

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      userId: ['', [Validators.required]],
      completed: [false],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.task.title,
      description: this.task.description,
      userId: this.task.userId,
      completed: this.task.completed,
    });
  }

  onSave() {
    if (this.form.valid) {
      const updatedTask = {
        ...this.task,
        ...this.form.value,
      };
      this.dialogRef.close(updatedTask);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get userId() {
    return this.form.get('userId');
  }
}
