import { TestBed } from '@angular/core/testing';

import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change language when setLanguage is called', () => {
    service.setLanguage('ar');
    expect(service.getLanguage()).toBe('ar');
    service.setLanguage('en');
    expect(service.getLanguage()).toBe('en');
  });

  it('should return the correct arabic error code translation', () => {
    service.setLanguage('ar');
    expect(service.translateErrorCode(300)).toBe('الدور موجود');
  });

  it('should return the correct english error code translation', () => {
    service.setLanguage('en');
    expect(service.translateErrorCode(300)).toBe('Role exists');
  });
});
