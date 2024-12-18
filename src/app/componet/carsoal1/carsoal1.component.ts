import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carsoal1',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './carsoal1.component.html',
  styleUrl: './carsoal1.component.scss'
})
export class Carsoal1Component {
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
    rtl: true,
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
