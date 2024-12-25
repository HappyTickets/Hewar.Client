import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { AboutComponent } from './component/about/about.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { ServicesComponent } from './component/services/services.component';
import { CompanyComponent } from './componet/company/company.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { FacilityAccountComponent } from './Components/AccountsForms/facility-account/facility-account.component';
import { IndividualAccountComponent } from './Components/AccountsForms/individual-account/individual-account.component';
import { CompanyAccountComponent } from './Components/AccountsForms/company-account/company-account.component';
import { CompainesComponent } from './Components/compaines/compaines.component';
import { CompanyDetailsComponent } from './Components/company-details/company-details.component';

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
    {path: "createAccount",  children: [
        {path: "", component: CreateAccountComponent, title: "CreateAccount"},
        {path: "companyAcc", component: CompanyAccountComponent, title: "CompanyAccount"},
        {path: "individualAcc", component: IndividualAccountComponent, title: "IndividualAccount"},
        {path: "facilityAcc", component: FacilityAccountComponent, title: "FacilityAccount"},
    ]},
    {path: "companies", component: CompainesComponent, title: "Compaines"},
    {path: 'companyDetails', component: CompanyDetailsComponent, title: 'Company Details'},


    {path:'**',component:NotfoundComponent ,title:'notFound'}
];
