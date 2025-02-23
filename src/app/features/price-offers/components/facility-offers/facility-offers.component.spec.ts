import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityOffersComponent } from './facility-offers.component';

describe('FacilityOffersComponent', () => {
  let component: FacilityOffersComponent;
  let fixture: ComponentFixture<FacilityOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
