import { AuthService } from './../../../features/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    TranslatePipe,
    RouterModule,
    NotificationsComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  language: 'ar' | 'en' = 'ar';
  menubarStyle = {
    'padding-top': '0.25vw',
    'padding-left': '0.57vw',
    'padding-right': '0.57vw',
    'padding-bottom': '0.25vw',
    '--p-menubar-item-focus-color': '#1A3A57',
    '--p-menubar-item-color': '#6F7481',
    'font-size': '1.125rem',
    position: 'fixed',
    width: 'min(100%, 100vw)',
    'border-radius': '0',
    'min-height': 'fit-content',
    height: 'var(--nav-height)',
    '--p-menubar-gap': '3vw',
  };

  menubarLabelStyle = {};
  ngOnInit() {
    setTimeout(() => {
      const navbar = document.querySelector('.nav-bar');
      if (navbar !== null) {
        const height = navbar.getBoundingClientRect().height;
        document.documentElement.style.setProperty(
          '--nav-height',
          `${height}px`
        );
      }
    });
    this.items = [
      {
        translateToken: 'app.navbar.home',
        label: this.translate.instant('app.navbar.home'),
        style: this.menubarLabelStyle,
        routerLink: '/home',
      },
      {
        translateToken: 'app.navbar.about',
        label: this.translate.instant('app.navbar.about'),
        style: this.menubarLabelStyle,
        routerLink: '/companies',
      },
      {
        translateToken: 'app.navbar.jobs',
        label: this.translate.instant('app.navbar.jobs'),
        style: this.menubarLabelStyle,
      },
      {
        translateToken: 'app.navbar.contact',
        label: this.translate.instant('app.navbar.contact'),
        style: this.menubarLabelStyle,
      },
    ]
  }

  constructor(
    private translate: TranslateService,
    private localizationService: LocalizationService,
    private authService: AuthService
  ) {
    this.language = this.localizationService.getLanguage();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  switchLanguage() {
    this.language = this.language === 'ar' ? 'en' : 'ar';
    this.localizationService.setLanguage(this.language);
    this.translate.use(this.language);
    document.documentElement.dir = this.language === 'ar' ? 'rtl' : 'ltr';
    this.items.forEach((item) => {
      item.label = this.translate.instant(item['translateToken']);
    });
  }

  logout() {
    this.authService.logout();
  }
}
