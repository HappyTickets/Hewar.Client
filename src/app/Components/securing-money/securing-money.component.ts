import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-securing-money',
  standalone: true,
  imports: [FadeInViewDirective],
  templateUrl: './securing-money.component.html',
  styleUrl: './securing-money.component.scss'
})
export class SecuringMoneyComponent {

}
