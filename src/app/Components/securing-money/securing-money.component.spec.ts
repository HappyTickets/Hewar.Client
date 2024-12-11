import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuringMoneyComponent } from './securing-money.component';

describe('SecuringMoneyComponent', () => {
  let component: SecuringMoneyComponent;
  let fixture: ComponentFixture<SecuringMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuringMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuringMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
