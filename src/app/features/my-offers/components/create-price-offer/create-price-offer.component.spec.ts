import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePriceOfferComponent } from './create-price-offer.component';

describe('CreatePriceOfferComponent', () => {
  let component: CreatePriceOfferComponent;
  let fixture: ComponentFixture<CreatePriceOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePriceOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePriceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
