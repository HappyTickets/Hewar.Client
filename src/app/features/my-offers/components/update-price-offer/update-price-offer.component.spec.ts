import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceOfferComponent } from './update-price-offer.component';

describe('UpdatePriceOfferComponent', () => {
  let component: UpdatePriceOfferComponent;
  let fixture: ComponentFixture<UpdatePriceOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePriceOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePriceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
