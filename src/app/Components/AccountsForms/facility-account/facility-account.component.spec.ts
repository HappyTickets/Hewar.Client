import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAccountComponent } from './facility-account.component';

describe('FacilityAccountComponent', () => {
  let component: FacilityAccountComponent;
  let fixture: ComponentFixture<FacilityAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
