import { TestBed } from '@angular/core/testing';

import { PriceOffersService } from './price-offers.service';

describe('PriceOffersService', () => {
  let service: PriceOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
