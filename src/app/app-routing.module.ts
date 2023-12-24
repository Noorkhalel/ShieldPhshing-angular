import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApiscreenComponent } from './apiscreen/apiscreen.component';
import { AboutComponent } from './about/about.component';
import { QuickcheckhomeComponent } from './quickcheckhome/quickcheckhome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:'apiscreen',component: ApiscreenComponent},
  {path:'queckcheckhome',component: QuickcheckhomeComponent},
  {path:'about',component: AboutComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
