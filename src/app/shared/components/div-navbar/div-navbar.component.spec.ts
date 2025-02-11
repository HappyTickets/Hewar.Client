import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivNavbarComponent } from './div-navbar.component';

describe('DivNavbarComponent', () => {
  let component: DivNavbarComponent;
  let fixture: ComponentFixture<DivNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
