import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-carousel-one',
  standalone: true,
  imports: [CarouselModule, FadeInViewDirective],
  templateUrl: './carousel-one.component.html',
  styleUrl: './carousel-one.component.scss'
})
export class CarouselOneComponent {
  customOptionsMain: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 4000,
    autoplayHoverPause: false,
    slideTransition: 'linear',
    smartSpeed: 4000,
    pullDrag: false,
    dots: false,
    rtl: false,
    nav: false,
    rewind: false,
    responsive: {
      0: { items: 1 },
      300: { items: 2 },
      600: { items: 3 },
      900: { items: 4 },
    },
  }
}
