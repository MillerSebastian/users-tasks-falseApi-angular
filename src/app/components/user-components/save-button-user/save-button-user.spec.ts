import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveButtonUser } from './save-button-user';

describe('SaveButtonUser', () => {
  let component: SaveButtonUser;
  let fixture: ComponentFixture<SaveButtonUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveButtonUser],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveButtonUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
