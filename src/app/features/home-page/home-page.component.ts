import { Component, OnDestroy, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule, MatTabsModule, CardModule, FloatLabelModule, CarouselModule, FormsModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnDestroy {
  language: 'ar' | 'en';
  private languageSubscription: Subscription;
  showScrollButton = false;
  
  scrollTopButtonStyle = {
    'position': 'fixed',
    'bottom': '2vw',
    'right': '2vw', 
    'width': 'max(3vw, 2rem)',
    'height': 'max(3vw, 2rem)',
    'border-radius': '50%',
    'background': '#1A759F',
    'z-index': '1000'
  };

  constructor(private localizationService: LocalizationService) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      lang => this.language = lang
    );
  }

  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }

  counts = environment.app.homePage;
  servicesTabs = [
    {
      label: "app.home-page.services.tabs.guard-services",
      cards: [
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle",
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        },
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle",
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        },
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.industrial-security.alt"
          },
          title: 'app.home-page.services.cards.industrial-security.title',
          subtitle: "app.home-page.services.cards.industrial-security.subtitle",
          content: 'app.home-page.services.cards.industrial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.industrial-security.action',
        }
      ]
    },
    {
      label: "app.home-page.services.tabs.surveillance-systems",
      cards: [
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle", 
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        },
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle", 
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        }
      ]
    },
    {
      label: "app.home-page.services.tabs.emergency-response",
      cards: [
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle",
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        }
      ]
    },
    {
      label: "app.home-page.services.tabs.security-training",
      cards: [
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle",
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        }
      ]
    },
    {
      label: "app.home-page.services.tabs.corporate-protection",
      cards: [
        {
          image: {
            url: "/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png",
            alt: "app.home-page.services.cards.commercial-security.alt"
          },
          title: 'app.home-page.services.cards.commercial-security.title',
          subtitle: "app.home-page.services.cards.commercial-security.subtitle",
          content: 'app.home-page.services.cards.commercial-security.content',
          actionButtonLabel: 'app.home-page.services.cards.commercial-security.action',
        }
      ]
    }
  ]
  achievements = [
    {
      title: 'app.home-page.achievements.facilities',
      subtitle: 'app.home-page.achievements.facility',
      count: environment.app.homePage.facilitiesCount
    },
    {
      title: 'app.home-page.achievements.security-personnel',
      subtitle: 'app.home-page.achievements.security-personnel',
      count: environment.app.homePage.securityPersonnelsCount
    },
    {
      title: 'app.home-page.achievements.companies', 
      subtitle: 'app.home-page.achievements.company',
      count: environment.app.homePage.companiesCount
    },
    {
      title: 'app.home-page.achievements.supervisors',
      subtitle: 'app.home-page.achievements.supervisor',
      count: environment.app.homePage.supervisorsCount
    }
  ]
  partners = [
    {
      name: 'app.home-page.partners.zein',
      logo: '/photos/zid.png',
      alt: 'app.home-page.partners.zein'
    },
    {
      name: 'app.home-page.partners.alpha',
      logo: '/photos/alpha.png',
      alt: 'app.home-page.partners.alpha'
    },
    {
      name: 'app.home-page.partners.falcon',
      logo: '/photos/falcon.png',
      alt: 'app.home-page.partners.falcon'
    },
    {
      name: 'app.home-page.partners.sidero',
      logo: '/photos/sidero.png',
      alt: 'app.home-page.partners.sidero'
    }
  ];

  news = [
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الأول: سوف نقوم بتنظيم فعالية مهرجان الأمني الدولي للشهر المقبل',
      enTitle: 'The first: We will organize an international security festival for the next month',
      commentsCount: '5',
      viewsCount: '20',
      date: '2/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الثاني: سوف نقوم بتنظيم فعالية مهرجان الأمني الدولي للشهر المقبل',
      enTitle: 'The second: We will organize an international security festival for the next month',
      commentsCount: '5',
      viewsCount: '20',
      date: '2/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الثالث: سوف نقوم بتنظيم فعالية مهرجان الأمني الدولي للشهر المقبل',
      enTitle: 'The third: We will organize an international security festival for the next month',
      commentsCount: '5',
      viewsCount: '20',
      date: '2/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الرابع: سوف نقوم بتنظيم فعالية مهرجان الأمني الدولي للشهر المقبل',
      enTitle: 'The fourth: We will organize an international security festival for the next month',
      commentsCount: '5',
      viewsCount: '20',
      date: '2/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الخامس: سوف نقوم بتنظيم فعالية مهرجان الأمني الدولي للشهر المقبل',
      enTitle: 'The fifth: We will organize an international security festival for the next month',
      commentsCount: '5',
      viewsCount: '20',
      date: '2/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'السادس: إطلاق برنامج تدريبي جديد لتأهيل حراس الأمن المحترفين',
      enTitle: 'The sixth: Launching a new training program to train professional security guards',
      commentsCount: '8',
      viewsCount: '35',
      date: '5/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'السابع: توقيع اتفاقية شراكة استراتيجية مع كبرى شركات الأمن العالمية',
      enTitle: 'The seventh: Signing a strategic partnership agreement with major security companies in the world',
      commentsCount: '12',
      viewsCount: '45',
      date: '8/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'الثامن: افتتاح مركز تدريب متخصص في تقنيات الأمن الحديثة',
      enTitle: 'The eighth: Opening a specialized training center in modern security technologies',
      commentsCount: '15',
      viewsCount: '60',
      date: '10/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'التاسع: إطلاق خدمات أمنية جديدة للمجمعات السكنية والتجارية',
      enTitle: 'The ninth: Launching new security services for residential and commercial complexes',
      commentsCount: '10',
      viewsCount: '40',
      date: '12/1/2025'
    },
    {
      image: {
        url: '/photos/49f1b233bc9326c3e2718d9b0ad53e3b.png',
        alt: 'Security guard'
      },
      arTitle: 'العاشر: تنظيم مؤتمر الأمن السيبراني وحماية المنشآت الحيوية',
      enTitle: 'The tenth: Organizing a cyber security conference and protecting vital facilities',
      commentsCount: '18',
      viewsCount: '75',
      date: '15/1/2025'
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    // Show button when page is scrolled more than 300px
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getVisibleItems(maxItems: number): number {
    const width = window.innerWidth;
    if (width <= 768) {
      return 1;
    } else if (width <= 1024) {
      return Math.min(2, maxItems);
    } else {
      return maxItems;
    }
  }
}

