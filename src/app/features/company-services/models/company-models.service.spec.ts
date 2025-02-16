import { TestBed } from '@angular/core/testing';

import { CompanyModelsService } from './company-models.service';

describe('CompanyModelsService', () => {
  let service: CompanyModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
