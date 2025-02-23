import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAdOfferComponent } from './create-company-ad-offer.component';

describe('CreateCompanyAdOfferComponent', () => {
  let component: CreateCompanyAdOfferComponent;
  let fixture: ComponentFixture<CreateCompanyAdOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompanyAdOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompanyAdOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
