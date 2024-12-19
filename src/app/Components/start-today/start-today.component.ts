import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-start-today',
  standalone: true,
  imports: [FadeInViewDirective],
  templateUrl: './start-today.component.html',
  styleUrl: './start-today.component.scss'
})
export class StartTodayComponent {

}
