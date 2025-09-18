import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleValidate } from './user-role-validate';

describe('UserRoleValidate', () => {
  let component: UserRoleValidate;
  let fixture: ComponentFixture<UserRoleValidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleValidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleValidate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
