import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideAnimations(),
    BrowserAnimationsModule,
    importProvidersFrom(CarouselModule),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
     provideHttpClient(withFetch(),
    ),
provideAnimations(),
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
