import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private subscription: Subscription | undefined;
  fistLeName = '';
  username = '';
  email = '';
  hashemail = '';
  apikey='';
  hashpass='***********';
  emailshow = '';
  typeAcc= '';
  constructor(private clipboard: Clipboard,private authService: AuthService, private http: HttpClient, private router: Router) {
    // Redirect to login if no access token is present
    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    const accessToken = this.authService.getAccessToken();
   

    if (!accessToken) {
      // Redirect to login if no access token is present
      this.router.navigate(['/login']);
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    
    this.http.get('http://127.0.0.1:5001/api/v1/user/me', { headers })
      .subscribe({
        next: (res: any) => {
          // console.log('Dashboard Response:', res);
          const firstLetter = res.user.username.charAt(0);
          const hashE = res.user.email.charAt(0)+'********@******';
          this.fistLeName = `${firstLetter}`.toUpperCase();
          this.username = res.user.username;
          this.email = res.user.email;
          this.hashemail = hashE;
          this.apikey = res.user.api_key;
          this.emailshow =hashE;
          this.typeAcc = res.user.type;
        },
        error: (error: any) => {
          console.error('Dashboard request failed:', error);
          this.fistLeName = 'Dashboard request failed';
          this.router.navigate(['/login']);
        }
      });
  }
  eyeName = false;
  eyeEmail = false;
  usernameshow = '*********';
  

  eyeShowInfoName(){
    if(this.eyeName){
      this.eyeName = false;//heddin
      this.usernameshow= '*********';
    }else{
      this.eyeName = true;//show
      this.usernameshow = this.username;
    }
  
  }
  eyeShowInfoEamil(){
    if(this.eyeEmail){
      this.eyeEmail = false;
      this.emailshow = this.hashemail;
    }else{
      this.eyeEmail = true;
      this.emailshow = this.email;
    }
  }
  copytextshow = false;
  copyHeroName() {
    this.clipboard.copy(this.apikey);
  }

  chageName: boolean = false;
  changeName(){
    return this.chageName = !this.chageName;
  }
  chagepass: boolean = false;

  changeAccountBar() {
    if(this.chagepass){
      this.chagepass = false;
    }
  }
  banUserPassword = '';
  changePassBar() {
    if(!this.chagepass && this.typeAcc.toUpperCase()=="normal".toUpperCase()){
      this.chagepass = true;
      this.banUserPassword = '';
    }else{
      this.banUserPassword = 'ban-user';
    }
  }
  
  newUsername = '';
  errorData: { error: string } | undefined;
  errorMessage='';
  showLog = false;
updateUsername() {
  const accessToken = this.authService.getAccessToken();

  if (!accessToken) {
    // Handle the case where there's no access token
    return;
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
 
  const body = { username: this.newUsername };

  this.http.put('http://127.0.0.1:5001/api/v1/user/update_name', body, { headers })
    .subscribe({
      next: (res: any) => {
        this.showLog = true;
        this.router.navigate(["dashboard/homeboard"]);
  
      },
      error: (error: any) => {
        console.error('Failed to update username:', error);
        // Handle errors as needed
        this.errorData = error.error;
        if (this.errorData && typeof this.errorData === 'object' && this.errorData.error) {
          if (this.errorData.error.toLowerCase() === "Username is too short".toLowerCase()){
            this.errorMessage = "Username is too short";
          }else if(this.errorData.error.toLowerCase() === "Username should be alphanumeric, also no spaces".toLowerCase()){
            this.errorMessage = "Username should be alphanumeric, also no spaces";
          }else if(this.errorData.error.toLowerCase() === "Username is taken".toLowerCase()){
            this.errorMessage = "Username is taken";
          }
        }else{
          this.errorMessage = "An unexpected error occurred. Please try again.";
        }
      }
    });
}

oldPass : { error: string } | undefined;
newPass : { error: string } | undefined;
errorDatapass: { error: string } | undefined;
errorMessagepass='';
updatePassword() {
  const accessToken = this.authService.getAccessToken();

  if (!accessToken) {
    // Handle the case where there's no access token
    return;
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  });
 
  const body = { 
    oldPassword: this.oldPass,
    newPassword: this.newPass
   };
   console.log('Passord updated successfully:', body);
   this.subscription = this.http.put('http://127.0.0.1:5001/api/v1/user/update_password', body, { headers })
   .subscribe({
      next: (res: any) => {
        // Handle the response from the server
        console.log('Passord updated successfully:', res);
        // Optionally, update the UI or perform other actions
      },
      error: (error: any) => {
        console.error('Failed to update password:', error);

        if (error.status === 400 && error.error.error === "Password is too short") {
          this.errorMessagepass = "Password is too short";
        } else if (error.status === 401 && error.error.error === "Invalid credentials") {
          this.errorMessagepass = "The password is incorrect";
        } else {
          this.errorMessagepass = "An unexpected error occurred. Please try again.";
        }
      }
    });
}


}
