import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedAdsComponent } from './opened-ads.component';

describe('OpenedAdsComponent', () => {
  let component: OpenedAdsComponent;
  let fixture: ComponentFixture<OpenedAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenedAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
