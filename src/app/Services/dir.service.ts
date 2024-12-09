import { Injectable, Renderer2 , RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private renderer: Renderer2;
  private isRtlSubject = new BehaviorSubject<boolean>(false);
  isRtl$ = this.isRtlSubject.asObservable();

  private languageSubject  = new BehaviorSubject<string>('en');
  currentLanguage = this.languageSubject.asObservable()

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setLanguageDirection(isRtl: boolean) {
    this.isRtlSubject.next(isRtl);
    const htmlTag = this.renderer.selectRootElement('html', true) as HTMLElement;
    htmlTag.dir = isRtl ? 'rtl' : 'ltr';
    if (isRtl) {
      htmlTag.classList.add('rtl');
      htmlTag.classList.remove('ltr');
    } else {
      htmlTag.classList.add('ltr');
      htmlTag.classList.remove('rtl');
    }
  }

  changeLanguage(lang: string) {
    this.languageSubject.next(lang);
  }

  getCurrentLang(): string {
    return this.languageSubject.getValue();
  }

}
