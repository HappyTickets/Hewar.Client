import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carsoal1Component } from './carsoal1.component';

describe('Carsoal1Component', () => {
  let component: Carsoal1Component;
  let fixture: ComponentFixture<Carsoal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carsoal1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carsoal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
