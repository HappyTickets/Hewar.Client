import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AboutComponent } from './Components/about/about.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ServicesComponent } from './Components/servicesComponent/services.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full', title:  "HomePage"},
    {path: 'home', component: HomeComponent, title: "HomePage"},
    {path: 'services', component: ServicesComponent, title: "ServicesPage"},
    {path: 'contactUs', component: ContactComponent, title: "ContactUs"},
    {path: 'aboutUs', component: AboutComponent, title: "aboutUs"},

    {path: '**', component: NotFoundComponent, title: "notFoundPage"}
];
