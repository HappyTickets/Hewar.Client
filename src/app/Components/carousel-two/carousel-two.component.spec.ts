import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTwoComponent } from './carousel-two.component';

describe('CarouselTwoComponent', () => {
  let component: CarouselTwoComponent;
  let fixture: ComponentFixture<CarouselTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
