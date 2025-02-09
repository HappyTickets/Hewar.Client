import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './core/services/localization/localization.service';
import { PrimeNG } from 'primeng/config';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import Aura from '@primeng/themes/aura';
import translationsEN from '../../public/i18n/en.json';
import translationsAR from '../../public/i18n/ar.json';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { DivNavbarComponent } from "./shared/components/div-navbar/div-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, DivNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private localizationService: LocalizationService,
    private primeng: PrimeNG
  ) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setTranslation('ar', translationsAR);
    this.translate.setTranslation('en', translationsEN);
    const currentLang = this.localizationService.getLanguage();
    this.translate.use(currentLang);

    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    this.primeng.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: 'dark'
      },
    })
  }
  title = 'HEWAR.CLIENT';
}
