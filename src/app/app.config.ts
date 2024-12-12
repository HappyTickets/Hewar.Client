import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
// أو أي مزود آخر تستخدمه


// تأكد من استيراده
// استيراد معالج HTTP إذا كنت بحاجة
// import { withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      // withViewTransitions()),
      // provideClientHydration(),
    //    provideHttpClient(
    //   //  withInterceptors([loadingInterceptor])
    //  ),
    provideAnimations(), // استرجاعها إذا كنت بحاجة إليها
    // provideToastr(), // استرجاعها إذا كنت بحاجة إليها
    // importProvidersFrom(NgxSpinnerModule), // استرجاعها إذا كنت بحاجة إليها
    // ترجمة وتحديد لغة التطبيق إذا كانت ستستخدم
    // TranslateModule.forRoot({
    //   defaultLanguage: 'en',
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ]
};

