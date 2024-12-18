import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../Services/my-translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive , TranslateModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly _MyTranslateService =inject(MyTranslateService);
  readonly _TranslateService =inject(TranslateService);

  change(lang:string):void{

    this._MyTranslateService.changeLang( lang );
    }
}
