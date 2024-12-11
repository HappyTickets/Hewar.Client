import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-asked-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asked-questions.component.html',
  styleUrl: './asked-questions.component.scss'
})
export class AskedQuestionsComponent {
  accordionItems = [
    {
      title: 'What blockchain technology does Secury use?',
      content:
        'We utilize a decentralized, public blockchain that is secured using industry-leading cryptographic encryption. This provides transparency, immunity to outages, and ironclad security.',
    },
    {
      title: 'How does Secury protect my data?',
      content:
        'Secury uses military-grade encryption to secure your data. Our decentralized network ensures that your data is safe from cyber attacks and data breaches.',
    },
    {
      title: 'How does Secury detect threats?',
      content:
        'Secury uses advanced AI-driven threat detection to monitor your network 24/7. Our team of expert security analysts ensures that your data is safe from cyber attacks.',
    },
    {
      title: 'How can I get started with Secury?',
      content:
        'Getting started with Secury is easy! Simply contact us to schedule a consultation with one of our security experts. Well work with you to develop a customized security solution that meets your needs.',
    },
    {
      title: 'What industries does Secury serve?',
      content:
        'Secury serves a wide range of industries, including finance, healthcare, government, and more. Our security solutions are tailored to meet the unique needs of each industry, ensuring that your data is safe and secure.',
    },
  ];

  activeIndex: number | null = null;

  isExpanded(index: number): boolean {
    return this.activeIndex === index;
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
