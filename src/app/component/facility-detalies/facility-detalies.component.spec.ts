import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetaliesComponent } from './facility-detalies.component';

describe('FacilityDetaliesComponent', () => {
  let component: FacilityDetaliesComponent;
  let fixture: ComponentFixture<FacilityDetaliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityDetaliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDetaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
