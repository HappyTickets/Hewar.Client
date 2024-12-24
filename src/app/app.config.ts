import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
  MatFormFieldModule,
  MatInputModule,
  CdkStepperModule,
  MatStepperModule,
    TranslateModule.forRoot({
    defaultLanguage:'en',
    loader: {
      provide: TranslateLoader,
      useFactory:HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
), provideAnimationsAsync()





  ]
};    


 


