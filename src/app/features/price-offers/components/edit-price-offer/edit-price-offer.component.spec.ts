import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceOfferComponent } from './edit-price-offer.component';

describe('EditPriceOfferComponent', () => {
  let component: EditPriceOfferComponent;
  let fixture: ComponentFixture<EditPriceOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPriceOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPriceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
