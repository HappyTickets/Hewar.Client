import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';

@Component({
  selector: 'app-trusted-users',
  standalone: true,
  imports: [CommonModule, FadeInViewDirective],
  templateUrl: './trusted-users.component.html',
  styleUrl: './trusted-users.component.scss'
})
export class TrustedUsersComponent {


  cards = [
    {
      title: 'Millar Garren',
      description: 'CEO, Imagine Agency',
      image: './assets/imgs/image-contact10.webp',
      para: '"Securys blockchain solutions have given us an impenetrable shield against cyber threats."'
    },
    {
      title: 'Steven Richard',
      description: 'Creative Director, Purple Pixel Studio',
      image: './assets/imgs/image-contact18.webp',
      para: '"After a series of breaches last year, we knew we had to reinforce our cybersecurity measures. Securys real-time anomaly detection and 24/7 security operations center enabled us to achieve proactive threat detection response."'
    },
    {
      title: 'Christopher Adam',
      description: 'CTO, DataSystems LLC',
      image: './assets/imgs/image-contact11.webp',
      para: '"Secury is our go-to partner for cutting-edge blockchain security solutions. Highly recommended!"'
    },
    {
      title: 'Benjamin Paul',
      description: 'CTO, NetPropel',
      image: './assets/imgs/image-contact12.webp',
      para: '"Secury enabled us to reduce security breaches by 75% with their real-time anomaly detection. Their team of security analysts also identified vulnerabilities we werent aware of"'
    },
    {
      title: 'Christina Blair',
      description: 'Co-Founder & CEO, CodeWrights',
      image: './assets/imgs/image-contact13.webp',
      para: '"Securys AI-powered threat detection gives us 360 degree protection we can count on."'
    },
    {
      title: 'Matthew Lee',
      description: 'CFO, Vista Media Group',
      image: './assets/imgs/image-contact14.webp',
      para: '"Thanks to Secury, we can focus on our core business instead of worrying about security."'
    },
    {
      title: 'Aaron Matthew',
      description: 'CFO, NumberNerds',
      image: './assets/imgs/image-contact15.webp',
      para: '"Securys robust encryption helps us meet the strictest industry compliance standards."'
    },
    {
      title: 'Michael Joseph',
      description: 'CEO, Imagine Agency',
      image: './assets/imgs/image-contact16.webp',
      para: '"Securys blockchain solutions have given us an impenetrable shield against cyber threats."'
    },
    {
      title: 'Gary Christopher',
      description: 'CTO, ContractCore LLC',
      image: './assets/imgs/image-contact17.webp',
      para: '"After a series of breaches last year, we knew we had to reinforce our cybersecurity measures. Securys real-time anomaly detection and 24/7 security operations center enabled us to achieve proactive threat detection response."'
    },
    
  ];
}
