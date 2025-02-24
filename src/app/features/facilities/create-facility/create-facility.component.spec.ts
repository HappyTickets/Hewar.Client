import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacilityComponent } from './create-facility.component';

describe('CreateFacilityComponent', () => {
  let component: CreateFacilityComponent;
  let fixture: ComponentFixture<CreateFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFacilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
