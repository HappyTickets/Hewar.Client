import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  showButton = false;

  // Show the button when the user scrolls down
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showButton = window.scrollY > 200;  // Show button when scrolled 200px down
  }

  // Scroll the page to the top when the button is clicked
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
