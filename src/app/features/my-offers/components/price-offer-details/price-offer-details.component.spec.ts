import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOfferDetailsComponent } from './price-offer-details.component';

describe('PriceOfferDetailsComponent', () => {
  let component: PriceOfferDetailsComponent;
  let fixture: ComponentFixture<PriceOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceOfferDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
