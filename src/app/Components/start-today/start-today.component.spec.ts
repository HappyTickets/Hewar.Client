import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTodayComponent } from './start-today.component';

describe('StartTodayComponent', () => {
  let component: StartTodayComponent;
  let fixture: ComponentFixture<StartTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
