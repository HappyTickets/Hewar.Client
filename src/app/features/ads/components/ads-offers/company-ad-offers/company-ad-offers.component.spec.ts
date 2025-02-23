import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdOffersComponent } from './company-ad-offers.component';

describe('CompanyAdOffersComponent', () => {
  let component: CompanyAdOffersComponent;
  let fixture: ComponentFixture<CompanyAdOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAdOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAdOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
