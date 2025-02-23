import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdOfferComponent } from './edit-ad-offer.component';

describe('EditAdOfferComponent', () => {
  let component: EditAdOfferComponent;
  let fixture: ComponentFixture<EditAdOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
