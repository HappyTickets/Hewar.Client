import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceRequestComponent } from './update-price-request.component';

describe('UpdatePriceRequestComponent', () => {
  let component: UpdatePriceRequestComponent;
  let fixture: ComponentFixture<UpdatePriceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePriceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePriceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
