import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [FadeInViewDirective],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

}
