import { TestBed } from '@angular/core/testing';

import { ScheduleEntriesService } from './schedule-entries.service';

describe('ScheduleEntriesService', () => {
  let service: ScheduleEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
