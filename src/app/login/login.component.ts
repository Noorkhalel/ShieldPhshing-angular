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
  errorLoginMessage = '';
  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']).then(() => {
          console.log('Successfully logged in!');
        });
      },
      (error) => {
        this.errorLoginMessage = 'The email or password wrong'
        console.error(error);
      }
    );

  }

  private deCode(t : string){
    return JSON.parse(atob(t.split(".")[1]));
  }
  private pass: string = '';
  errorData: string ='';
  handleLogin(resp:any){
    if(resp){
      const payLoad = this.deCode(resp.credential);    
      this.pass = payLoad.sub+payLoad.sub;
      this.authService.signup(payLoad.given_name, payLoad.email,this.pass,"google").subscribe(
        (response) => {
          this.router.navigate(['/dashboard']).then(() => {
            this.authService.login(payLoad.email, this.pass).subscribe((response) => {
              this.router.navigate(['/dashboard']).then(() => {
                console.log('Successfully logged in!');
              });
            });
          });
        },
      );
      this.authService.login(payLoad.email, this.pass).subscribe((response) => {
        this.router.navigate(['/dashboard']).then(() => {
          console.log('Successfully logged in!');
        });
      });
    }
  }
}
