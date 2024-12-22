import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetaliesOneComponent } from './facility-detalies-one.component';

describe('FacilityDetaliesOneComponent', () => {
  let component: FacilityDetaliesOneComponent;
  let fixture: ComponentFixture<FacilityDetaliesOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityDetaliesOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDetaliesOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
