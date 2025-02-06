import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { RegisterCompanyComponent } from '../register-company/register-company.component';
import { RegisterGuardComponent } from '../register-guard/register-guard.component';
import { RegisterFacilityComponent } from '../register-facility/register-facility.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, RouterModule, RadioButtonModule, FormsModule, RegisterCompanyComponent, RegisterGuardComponent, RegisterFacilityComponent, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  accountType = 'company';
  changeForm(type: string): void {
    localStorage.setItem('accountType', type);
  }
  ngOnInit(): void {
    const type = localStorage.getItem('accountType');
    if(type) this.accountType = type;
    else this.accountType = 'company';
  }
}
