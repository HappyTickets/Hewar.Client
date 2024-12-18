import { TestBed } from '@angular/core/testing';

import { HttpClientFacadeService } from './http-client-facade.service';

describe('HttpClientFacadeService', () => {
  let service: HttpClientFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
