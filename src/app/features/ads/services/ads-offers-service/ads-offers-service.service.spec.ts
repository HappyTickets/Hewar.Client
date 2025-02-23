import { TestBed } from '@angular/core/testing';

import { AdsOffersServiceService } from './ads-offers-service.service';

describe('AdsOffersServiceService', () => {
  let service: AdsOffersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsOffersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
