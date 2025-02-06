import { Injectable } from '@angular/core';
import { ErrorCodes } from '../../enums/error-codes';
import { errorCodeTranslator } from '../../enums/error-codes-translator';
import { SuccessCodes } from '../../enums/success-codes';
import { successCodeTranslator } from '../../enums/success-codes-translator';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private languageSubject = new BehaviorSubject<'ar' | 'en'>(
    this.getLanguage()
  );
  language$ = this.languageSubject.asObservable();

  setLanguage(lang: 'ar' | 'en'): void {
    localStorage.setItem('lang', lang);
    this.languageSubject.next(lang);
  }

  getLanguage(): 'ar' | 'en' {
    return localStorage.getItem('lang')
      ? (localStorage.getItem('lang') as 'ar' | 'en')
      : 'en';
  }

  translateErrorCode(code: ErrorCodes): string {
    const lang = this.getLanguage();
    const tranlation = errorCodeTranslator[lang][code];
    return tranlation
      ? tranlation
      : errorCodeTranslator[lang][ErrorCodes.Unknown];
  }

  translateSuccessCode(code: SuccessCodes): string {
    const lang = this.getLanguage();
    const tranlation = successCodeTranslator[lang][code];
    return tranlation
      ? tranlation
      : successCodeTranslator[lang][SuccessCodes.None];
  }
  createDropdown(enumObj: any): { name: string; code: number }[] {
    return Object.entries(enumObj)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({ name: key, code: value as number }));
  }
}
