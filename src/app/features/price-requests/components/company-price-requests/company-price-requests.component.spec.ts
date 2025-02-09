import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPriceRequestsComponent } from './company-price-requests.component';

describe('CompanyPriceRequestsComponent', () => {
  let component: CompanyPriceRequestsComponent;
  let fixture: ComponentFixture<CompanyPriceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPriceRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPriceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
