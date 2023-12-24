declare var google: any;
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    // Redirect to dashboard if user is already authenticated
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '255467973370-inpe88bijhgbjk230q8bqj1rbtqaopmu.apps.googleusercontent.com',
      callback: (resp:any)=> this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      
      size: 'large',
      shape: 'rectangle',
      width:360
    });
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']).then(() => {
          console.log('Successfully logged in!');
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private deCode(t : string){
    return JSON.parse(atob(t.split(".")[1]));
  }

  handleLogin(resp:any){
    if(resp){
      const payLoad = this.deCode(resp.credential);
      // sessionStorage.setItem("loginedInUser", JSON.stringify(payLoad));
      console.log(payLoad.name)
    }
  }
}
