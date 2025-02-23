import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAdOffersComponent } from './facility-ad-offers.component';

describe('FacilityAdOffersComponent', () => {
  let component: FacilityAdOffersComponent;
  let fixture: ComponentFixture<FacilityAdOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityAdOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityAdOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
