import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-next-generation',
  standalone: true,
  imports: [FadeInViewDirective],
  templateUrl: './next-generation.component.html',
  styleUrl: './next-generation.component.scss'
})
export class NextGenerationComponent {

}
