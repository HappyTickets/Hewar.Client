import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carsoul-main',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carsoul-main.component.html',
  styleUrl: './carsoul-main.component.scss',
})
export class CarsoulMainComponent {

  customOptionsMainSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    // autoplayTimeout: 0, // No delay between transitions
    autoplaySpeed: 3000, // Transition speed
    autoplayHoverPause: false, // Disable pause on hover
    slideTransition: 'linear', // Smooth transition
    smartSpeed: 3000, // Smoothness for autoplay
    pullDrag: false, // Disable drag for continuous motion
    dots: false,
    rtl: true, // Enable RTL if needed
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
    autoplaySpeed: 4000,
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
    autoplaySpeed: 3500,
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
