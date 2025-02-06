import { TestBed } from '@angular/core/testing';

import { InsuranceAdsService } from './insurance-ads.service';

describe('InsuranceAdsService', () => {
  let service: InsuranceAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
