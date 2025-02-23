import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEntriesComponent } from './schedule-entries.component';

describe('ScheduleEntriesComponent', () => {
  let component: ScheduleEntriesComponent;
  let fixture: ComponentFixture<ScheduleEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
