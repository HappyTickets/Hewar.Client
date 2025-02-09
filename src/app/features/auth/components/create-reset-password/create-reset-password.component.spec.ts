import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResetPasswordComponent } from './create-reset-password.component';

describe('CreateResetPasswordComponent', () => {
  let component: CreateResetPasswordComponent;
  let fixture: ComponentFixture<CreateResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
