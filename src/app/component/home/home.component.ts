import { Component } from '@angular/core';
import { StartTodayComponent } from "../../Components/start-today/start-today.component";
import { AskedQuestionsComponent } from "../../Components/asked-questions/asked-questions.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SecuryWorksComponent } from "../../Components/secury-works/secury-works.component";
import { SecuringMoneyComponent } from "../../Components/securing-money/securing-money.component";
import { CarsoulMainComponent } from "../carsoul-main/carsoul-main.component";
import { BlockchainComponent } from "../blockchain/blockchain.component";
import { AnalystsBoxComponent } from "../../Components/analysts-box/analysts-box.component";
import { CardsComponent } from "../../Components/cards/cards.component";
import { Carsoal1Component } from "../../componet/carsoal1/carsoal1.component";
import { HeroComponent } from "../../Components/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StartTodayComponent,
    AskedQuestionsComponent,
    ReviewsComponent,
    SecuryWorksComponent,
    SecuringMoneyComponent,
    CarsoulMainComponent,
    BlockchainComponent,
    AnalystsBoxComponent,
    CardsComponent,
    Carsoal1Component,
    HeroComponent,
],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}