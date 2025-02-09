import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePriceRequestComponent } from './create-price-request.component';

describe('CreatePriceRequestComponent', () => {
  let component: CreatePriceRequestComponent;
  let fixture: ComponentFixture<CreatePriceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePriceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePriceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
