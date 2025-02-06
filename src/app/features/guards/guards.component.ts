import { Component, inject, OnInit } from '@angular/core';
import { GuardsService } from './services/guards.service';

@Component({
  selector: 'app-guards',
  standalone: true,
  imports: [],
  templateUrl: './guards.component.html',
  styleUrl: './guards.component.scss'
})
export class GuardsComponent implements OnInit {
  private _guardsService = inject(GuardsService)
  ngOnInit(): void {
    this._guardsService.getAllGuards().subscribe((res) => {
      console.log(res)
    })
  }
}
