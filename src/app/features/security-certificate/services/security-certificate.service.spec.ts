import { TestBed } from '@angular/core/testing';

import { SecurityCertificateService } from './security-certificate.service';

describe('SecurityCertificateService', () => {
  let service: SecurityCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
