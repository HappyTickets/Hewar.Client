import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { WOW } from 'wowjs';
import { NavbarComponent } from './Components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('wowjs').then((module) => {
        const WOW = module.WOW;
        const wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 100,
          mobile: true,
          live: true,
        });
        wow.init();
      });
    }

    if (typeof window !== 'undefined') {
      console.log("Initializing AOS");
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
      });
    }
  }

}
