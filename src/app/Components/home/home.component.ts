import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeTab: string = 'stats';

  slides = [
    { src: 'images/44.jpeg', title: 'carouselText.title1', caption: 'carouselText.description1'},
    { src: 'images/55.jpeg', title: 'carouselText.title2', caption: 'carouselText.description2'},
    { src: 'images/33.jpeg', title: 'carouselText.title3', caption: 'carouselText.description3'},
  ];

  cards = [
    {
      image: 'images/33.jpeg',
      title: 'serviceCards.title1',
      text: 'serviceCards.description1',
    },
    {
      image: 'images/22.jpeg',
      title: 'serviceCards.title2',
      text: 'serviceCards.description2',
    },
    {
      image: 'images/11.jpeg',
      title: 'serviceCards.title3',
      text: 'serviceCards.description3',
    },
    {
      image: 'images/66.jpeg',
      title: 'serviceCards.title4',
      text: 'serviceCards.description4',
    },

  ];

  rightCards = [
    {
      description: `whyChooseUsSection1.description1`,
    },
    {
      description: `whyChooseUsSection1.description2`,
    },
    {
      description: `whyChooseUsSection1.description3`,
    },
    {
      description: `whyChooseUsSection1.description4`,
    },
    {
      description: `whyChooseUsSection1.description5`,
    },
    {
      description: `whyChooseUsSection1.description6`,
    },
    {
      description: `whyChooseUsSection1.description7`,
    },
    {
      description: `whyChooseUsSection1.description8`,
    },
  ]

  smallCards = [
    {
      title: "whyChooseUsSmallCards.title1",
      description: "whyChooseUsSmallCards.description1"
    },
    {
      title: "whyChooseUsSmallCards.title2",
      description: "whyChooseUsSmallCards.description2"
    },
    {
      title: "whyChooseUsSmallCards.title3",
      description: "whyChooseUsSmallCards.description3"
    },
    {
      title: "whyChooseUsSmallCards.title4",
      description: "whyChooseUsSmallCards.description4"
    },
  ]

}