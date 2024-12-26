import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../Services/my-translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[RouterLink, 
    RouterLinkActive,
     TranslateModule, 
     CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  dropdownOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  readonly _MyTranslateService =inject(MyTranslateService);
  readonly _TranslateService =inject(TranslateService);

  change(lang:string):void{

    this._MyTranslateService.changeLang( lang );
    }
}
