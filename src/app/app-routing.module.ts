import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApiscreenComponent } from './apiscreen/apiscreen.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeboardComponent } from './homeboard/homeboard.component';
import { ApisComponent } from './apis/apis.component';
import { AbutusComponent } from './abutus/abutus.component';
import { MultidimensionalComponent } from './multidimensional/multidimensional.component';
import { URLlevelComponent } from './urllevel/urllevel.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:'apiscreen',component: ApiscreenComponent},
  {path:'about',component: AboutComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'Termsofservice',component:TermsOfServiceComponent},
  
  { path: 'dashboard', component: DashboardComponent, children: [
    {path:'', redirectTo:'homeboard', pathMatch: 'full'},
    { path: 'homeboard', component: HomeboardComponent },
    {path:'abutus',component:AbutusComponent},
    { path: 'apis', component:ApisComponent},
    { path: 'URLlevel', component:URLlevelComponent},
    { path: 'multidimensional', component:MultidimensionalComponent},
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
