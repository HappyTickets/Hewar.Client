import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetialsFacilityComponent } from './detials-facility.component';

describe('DetialsFacilityComponent', () => {
  let component: DetialsFacilityComponent;
  let fixture: ComponentFixture<DetialsFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetialsFacilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetialsFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
