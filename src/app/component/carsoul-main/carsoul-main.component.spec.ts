import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsoulMainComponent } from './carsoul-main.component';

describe('CarsoulMainComponent', () => {
  let component: CarsoulMainComponent;
  let fixture: ComponentFixture<CarsoulMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsoulMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsoulMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
