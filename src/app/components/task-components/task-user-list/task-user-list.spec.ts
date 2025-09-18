import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserList } from './task-user-list';

describe('TaskUserList', () => {
  let component: TaskUserList;
  let fixture: ComponentFixture<TaskUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskUserList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskUserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
