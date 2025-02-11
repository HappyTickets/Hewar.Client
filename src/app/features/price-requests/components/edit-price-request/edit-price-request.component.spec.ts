import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceRequestComponent } from './edit-price-request.component';

describe('EditPriceRequestComponent', () => {
  let component: EditPriceRequestComponent;
  let fixture: ComponentFixture<EditPriceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPriceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPriceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
