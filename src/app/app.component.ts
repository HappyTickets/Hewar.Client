import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./component/navbar/navbar.component";
import { FooterComponent } from './component/footer/footer.component';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroComponent } from "./Components/hero/hero.component";


import { WOW } from 'wowjs';
import { AnalystsBoxComponent } from "./Components/analysts-box/analysts-box.component";
import { SecuringMoneyComponent } from "./Components/securing-money/securing-money.component";
import AOS from 'aos';
import { AskedQuestionsComponent } from "./Components/asked-questions/asked-questions.component";
import { CardsComponent } from "./Components/cards/cards.component";
import { StartTodayComponent } from "./Components/start-today/start-today.component";
import { SecuryWorksComponent } from "./Components/secury-works/secury-works.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AnalystsBoxComponent, SecuringMoneyComponent, AskedQuestionsComponent, CardsComponent, StartTodayComponent, SecuryWorksComponent, HeroComponent],
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
