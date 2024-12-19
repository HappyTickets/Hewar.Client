import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-analysts-box',
  standalone: true,
  imports: [FadeInViewDirective],
  templateUrl: './analysts-box.component.html',
  styleUrl: './analysts-box.component.scss'
})
export class AnalystsBoxComponent {

}
