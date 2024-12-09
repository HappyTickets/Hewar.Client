import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../Services/dir.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule, MatMenuModule, MatButtonToggleModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileMenuOpen = false;
  selectedLang:string ='en'

  constructor(private translate :TranslateService, private LanguageService:LanguageService) {
      this.translate.setDefaultLang('en')
      this.LanguageService.currentLanguage.subscribe(lang=>{
        this.selectedLang = lang
        this.translate.use(lang)
        const isRtl = lang === 'ar';
        this.LanguageService.setLanguageDirection(isRtl)
      })

  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  switchlanguage(lang : string){
    this.LanguageService.changeLanguage(lang)
    console.log('Current language:', lang);
  }
}
