import { Route } from '@angular/router';
import { CreateResetPasswordComponent } from '../components/create-reset-password/create-reset-password.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-reset-password', component: CreateResetPasswordComponent },
];
