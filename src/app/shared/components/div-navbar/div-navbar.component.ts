import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-div-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './div-navbar.component.html',
  styleUrl: './div-navbar.component.scss',
})
export class DivNavbarComponent {}
