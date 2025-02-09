import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGuardComponent } from './register-guard.component';

describe('RegisterGuardComponent', () => {
  let component: RegisterGuardComponent;
  let fixture: ComponentFixture<RegisterGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterGuardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
