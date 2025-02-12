import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityPriceRequestsComponent } from './facility-price-requests.component';

describe('FacilityPriceRequestsComponent', () => {
  let component: FacilityPriceRequestsComponent;
  let fixture: ComponentFixture<FacilityPriceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityPriceRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityPriceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
