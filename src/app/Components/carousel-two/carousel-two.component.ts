import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-carousel-two',
  standalone: true,
  imports: [CarouselModule, FadeInViewDirective],
  templateUrl: './carousel-two.component.html',
  styleUrl: './carousel-two.component.scss'
})
export class CarouselTwoComponent {

  customOptionsMainSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    // autoplayTimeout: 0,
    autoplaySpeed: 3000,
    autoplayHoverPause: false, 
    slideTransition: 'linear',
    smartSpeed: 3000, 
    pullDrag: false, 
    dots: false,
    rtl: true,
    nav: false,
    rewind: false,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
  };
  
  customOptionsLastSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    // autoplayTimeout: 0,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    slideTransition: 'linear',
    smartSpeed: 4000,
    pullDrag: false,
    dots: false,
    rtl: true,
    nav: false,
    rewind: false,
    responsive: {
      0: { items: 1 },
      300: { items: 2 },
      600: { items: 3 },
      900: { items: 4 },
    },
  };
  
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    // autoplayTimeout: 0,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    slideTransition: 'linear',
    smartSpeed: 3500,
    pullDrag: false,
    dots: false,
    rtl: false,
    nav: false,
    rewind: false,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
  };

}
