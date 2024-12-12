import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false ,
    smartSpeed: 800,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  customOptionsMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false ,
    smartSpeed: 1200,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

// };
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  pullDrag: false,
  dots: false ,
  smartSpeed: 1200,
  navSpeed: 1000,
  rtl:true,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
};



// customOptions: OwlOptions = {
//   loop: true,
//   mouseDrag: true,
//   touchDrag: true,
//   autoplay: true,
//   autoplayTimeout: 2000,
//   autoplayHoverPause: true,
//   pullDrag: false,
//   dots: false,
//   smartSpeed: 800,
//   navSpeed: 700,
//   navText: ['', ''],
//   responsive: {
//     0: { items: 1 },
//     400: { items: 2 },
//     740: { items: 3 },
//     940: { items: 4 }
//   },
//   nav: false
// }
}