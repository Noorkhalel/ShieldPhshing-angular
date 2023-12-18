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
import { QuickcheckhomeComponent } from './quickcheckhome/quickcheckhome.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ApiscreenComponent,
    BodyComponent,
    AboutComponent,
    QuickcheckhomeComponent,
    SignupComponent,
    TermsOfServiceComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
