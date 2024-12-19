

import { Directive, ElementRef, Inject, PLATFORM_ID, OnInit, OnDestroy, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';

@Directive({
  selector: '[FadeInView]',
  standalone: true
})
export class FadeInViewDirective implements OnInit, OnDestroy {
  private elRef: ElementRef = inject(ElementRef);
  private observer!: IntersectionObserver;
  @Input() typePosition:string='top'

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.elRef.nativeElement.style.transition = 'all 1.5s ease-in-out';
    this.elRef.nativeElement.style.opacity = '0';
    this.elRef.nativeElement.style.transform = 'translateY(50px)';
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.elRef.nativeElement.style.opacity = '1';
            this.elRef.nativeElement.style.transform = 'translateY(0px)';
          }
        });
      });

      this.observer.observe(this.elRef.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

