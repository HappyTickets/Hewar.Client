import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { AboutComponent } from './component/about/about.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { ServicesComponent } from './component/services/services.component';
import { CompanyComponent } from './componet/company/company.component';

export const routes: Routes = [


    {path:'',redirectTo:'home' , pathMatch:'full'},
    {path:'home',component:HomeComponent , title:'home'},
    {path:'about',component:AboutComponent ,title:'about'},
    {path:'contact',component:ContactusComponent, title:'contact'},
    {path:'register',component:RegisterComponent, title:'register'},
    {path:'login',component:LoginComponent, title:'login'},

    {path:'team',component:TeamComponent, title:'team'},
    {path:'services',component:ServicesComponent, title:'services'},
    {path:'company',component:CompanyComponent, title:'company'},





    {path:'**',component:NotfoundComponent ,title:'notFound'}










];
