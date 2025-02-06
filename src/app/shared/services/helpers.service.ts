import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
