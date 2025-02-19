import { TestBed } from '@angular/core/testing';

import { HewarServicesService } from './hewar-services.service';

describe('HewarServicesService', () => {
  let service: HewarServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HewarServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
