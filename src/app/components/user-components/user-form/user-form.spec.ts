import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { UserForm } from './user-form';
import {User} from '../../../models/user.model';

describe('UserForm', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should be valid with correct data', () => {
    component.form.setValue({
      name: 'Juan Pérez',
      email: 'juan@email.com',
      role: 'user',
    });

    expect(component.form.valid).toBeTruthy();
  });

  it('should emit user when form is valid', () => {
    spyOn(component.userAdded, 'emit');

    component.form.setValue({
      name: 'Ana García',
      email: 'ana@email.com',
      role: 'user'
    });

    component.onSubmit();

    expect(component.userAdded.emit).toHaveBeenCalledWith({
      id: jasmine.any(Number),
      name: 'Ana García',
      email: 'ana@email.com',
      role: 'user',
    });
  });

  it('should reset form after submit', () => {
    component.form.setValue({
      name: 'Test User',
      email: 'test@email.com',
      role: 'user',
    });

    component.onSubmit();

    expect(component.form.value.name).toBe('');
    expect(component.form.value.email).toBe('');
    expect(component.form.value.active).toBe(true);
  });

  it('should not emit when form is invalid', () => {
    spyOn(component.userAdded, 'emit');

    component.form.setValue({
      name: '',
      email: 'invalid-email',
      role: 'admin',
    });

    component.onSubmit();

    expect(component.userAdded.emit).not.toHaveBeenCalled();
  });
});
