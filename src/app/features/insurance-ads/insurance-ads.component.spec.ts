import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAdsComponent } from './insurance-ads.component';

describe('InsuranceAdsComponent', () => {
  let component: InsuranceAdsComponent;
  let fixture: ComponentFixture<InsuranceAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
