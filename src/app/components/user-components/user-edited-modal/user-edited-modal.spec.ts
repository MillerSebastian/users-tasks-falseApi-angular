import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditedModal } from './user-edited-modal';

describe('UserEditedModal', () => {
  let component: UserEditedModal;
  let fixture: ComponentFixture<UserEditedModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditedModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditedModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
