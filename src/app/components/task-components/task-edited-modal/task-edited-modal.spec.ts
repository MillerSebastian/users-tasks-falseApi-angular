import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditedModal } from './task-edited-modal';

describe('TaskEditedModal', () => {
  let component: TaskEditedModal;
  let fixture: ComponentFixture<TaskEditedModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditedModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditedModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
