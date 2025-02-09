import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalInterceptor } from './core/interceptors/global.interceptor';
import { toastrInterceptor } from './core/interceptors/toastr.interceptor';
import { authInterceptor } from './features/auth/interceptors/auth.interceptor';
import {provideTranslateService} from "@ngx-translate/core";
import { provideRouter, RouterModule, } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr({ closeButton: true }),
    providePrimeNG(),
    provideHttpClient( withInterceptors([globalInterceptor, authInterceptor, toastrInterceptor])),
    provideTranslateService({ defaultLanguage: 'en'}),
  ],
};
