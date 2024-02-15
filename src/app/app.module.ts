import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ApiscreenComponent } from './apiscreen/apiscreen.component';
import { BodyComponent } from './body/body.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ApiOfUserComponent } from './api-of-user/api-of-user.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { HomeboardComponent } from './homeboard/homeboard.component';
import { ApisComponent } from './apis/apis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from "ng-apexcharts";
import { SettingsComponent } from './settings/settings.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FooteerHomeComponent } from './footeer-home/footeer-home.component';
import { AbutusComponent } from './abutus/abutus.component';
import { MultidimensionalComponent } from './multidimensional/multidimensional.component';
import { URLlevelComponent } from './urllevel/urllevel.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ApiscreenComponent,
    BodyComponent,
    AboutComponent,
    SignupComponent,
    TermsOfServiceComponent,
    DashboardComponent,
    LoginComponent,
    ApiOfUserComponent,
    SidenavComponent,
    SublevelMenuComponent,
    ContainerComponent,
    HeaderComponent,
    HomeboardComponent,
    ApisComponent,
    SettingsComponent,
    FooteerHomeComponent,
    AbutusComponent,
    MultidimensionalComponent,
    URLlevelComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    NgApexchartsModule,
    ClipboardModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
