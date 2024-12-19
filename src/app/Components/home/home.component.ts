import { Component } from '@angular/core';
import { StartTodayComponent } from "../start-today/start-today.component";
import { AskedQuestionsComponent } from "../asked-questions/asked-questions.component";
import { SecuryWorksComponent } from "../secury-works/secury-works.component";
import { SecuringMoneyComponent } from "../securing-money/securing-money.component";
import { AnalystsBoxComponent } from "../analysts-box/analysts-box.component";
import { CardsComponent } from "../cards/cards.component";
import { HeroComponent } from "../hero/hero.component";
import { NextGenerationComponent } from "../next-generation/next-generation.component";
import { TrustedUsersComponent } from "../trusted-users/trusted-users.component";
import { CarouselOneComponent } from "../carousel-one/carousel-one.component";
import { CarouselTwoComponent } from "../carousel-two/carousel-two.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StartTodayComponent,
    AskedQuestionsComponent,
    SecuryWorksComponent,
    SecuringMoneyComponent,
    AnalystsBoxComponent,
    CardsComponent,
    HeroComponent,
    NextGenerationComponent,
    TrustedUsersComponent,
    CarouselOneComponent,
    CarouselTwoComponent,
],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}