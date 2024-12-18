import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



// تأكد من استيراده
// استيراد معالج HTTP إذا كنت بحاجة
// import { withFetch } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
     provideHttpClient(withFetch(),
    //  withInterceptors([loadingInterceptor])
    ),

provideAnimations(),
// provideToastr(),
importProvidersFrom(
  TranslateModule.forRoot({
    defaultLanguage:'en',
    loader: {
      provide: TranslateLoader,
      useFactory:HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
)


 


  ]
};    


  //   providers: [
  //     provideRouter(routes),
  //     // withViewTransitions()),
  //     // provideClientHydration(),
  //   //    provideHttpClient(
  //   //   //  withInterceptors([loadingInterceptor])
  //   //  ),
  //   provideAnimations(), // استرجاعها إذا كنت بحاجة إليها
  //   // provideToastr(), // استرجاعها إذا كنت بحاجة إليها
  //   // importProvidersFrom(NgxSpinnerModule), // استرجاعها إذا كنت بحاجة إليها
  //   // ترجمة وتحديد لغة التطبيق إذا كانت ستستخدم
  //   // TranslateModule.forRoot({
  //   //   defaultLanguage: 'en',
  //   //   loader: {
  //   //     provide: TranslateLoader,
  //   //     useFactory: HttpLoaderFactory,
  //   //     deps: [HttpClient]
  //   //   }
  //   // })
  // ]


