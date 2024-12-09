import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ScrollToTopComponent } from "./Components/Reusable/scroll-to-top/scroll-to-top.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private translate: TranslateService){
    console.log('test')
    // console.log(this.initializeTranslation())
  }
  
  initializeTranslation(){
    this.translate.addLangs(['en' , 'ar'])
    this.translate.setDefaultLang('en')
    const browserlang= this.translate.getBrowserLang()
    console.log('browserlang')
    console.log(browserlang)
    this.translate.use(browserlang?.match(/en|ar/)?browserlang:'en')
  }
}
