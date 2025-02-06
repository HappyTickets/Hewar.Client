import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFacilityComponent } from './register-facility.component';

describe('RegisterFacilityComponent', () => {
  let component: RegisterFacilityComponent;
  let fixture: ComponentFixture<RegisterFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFacilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
