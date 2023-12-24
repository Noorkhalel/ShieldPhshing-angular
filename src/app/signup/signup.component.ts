declare var google: any;
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  nameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';

  apiUrl = 'http://127.0.0.1:5001/api/v1/user/register';

  isChecked: boolean = false;
  responseData: JSON | undefined;
  errorMessageName: string | undefined;
  errorMessageEmail: string | undefined;
  errorMessage: string | undefined;
  errorName: string='';
  errorEmail: string='';
  errorpassword: string='';
  erroragree: string='';
  errorMessagePassword: string='';
  match: string = '';
  errorpasswordMatch: string='';
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
      width: "800",
      signup_with:"Sign up with Google"
    });
  }
  errorData: { error: string } | undefined;
  ///
  input1Value: string = '';
  input2Value: string = '';
  input3Value: string = '';
  isInput1Empty: boolean = false;
  isInput2Empty: boolean = false;
  isInput3Empty: boolean = false;
  
  everyThinkOk:boolean = true;

  register(){
    if(this.isInput1Empty = this.input1Value.trim() === ''){
      //name
      this.errorName = "massage-error";
      this.errorMessageName = "The username is empty.";
      this.everyThinkOk = false;
    }
    
    if(this.isInput2Empty = this.input2Value.trim() === ''){
      //email
      this.errorMessageEmail = "The email is empty.";
      this.errorEmail = "massage-error";
      this.everyThinkOk = false;
    }
    if(this.isInput3Empty = this.input3Value.trim() === ''){
      //password
      this.errorMessagePassword = "The password is empty.";
      this.errorpassword = "massage-error";
      this.everyThinkOk = false;
    }
    if(this.everyThinkOk){
        if(!this.isSame){
          this.errorpasswordMatch ='massage-error';
        }else if(!this.isChecked){
          this.erroragree = 'Please agree to the terms of service to register';
        }else{
          this.authService.signup(this.nameInput, this.emailInput,this.passwordInput ,"normal").subscribe(
              (response) => {
                this.responseData = response;
                this.router.navigate(["/login"]);
              },
              (error) => {
                console.error('Error:', error);
                this.errorData = error.error;

                if (this.errorData && typeof this.errorData === 'object' && this.errorData.error) {
                  if (this.errorData.error.toLowerCase() === "Email is taken".toLowerCase()) {
                    // Display a specific message for email taken error
                    this.errorMessageEmail = "The email is already taken. Please choose a different email.";
                    this.errorEmail = "massage-error";

                  } else if (this.errorData.error.toLowerCase() === "Username is taken".toLowerCase()) {
                    // Display a specific message for username taken error
                    this.errorName = "massage-error";
                    this.errorMessageName = "The username is already taken. Please choose a different username.";

                  }else if (this.errorData.error.toLowerCase() === "Username should be alphanumeric, also no spaces".toLowerCase()) {
                    // Display a specific message for username taken error
                    this.errorName = "massage-error";
                    this.errorMessageName = "Username should be alphanumeric, also no spaces";

                  }else if (this.errorData.error.toLowerCase() === "Username is too short".toLowerCase()) {
                    // Display a specific message for username taken error
                    this.errorName = "massage-error";
                    this.errorMessageName = "Username is too short";

                  }else if (this.errorData.error.toLowerCase() === "Email is not valid".toLowerCase()) {
                    // Display a specific message for username taken error
                    this.errorMessageEmail = "The Email is not valid.";
                    this.errorEmail = "massage-error";
                  }else if (this.errorData.error.toLowerCase() === "Password is too short".toLowerCase()) {
                    // Display a specific message for username taken error
                    this.errorMessagePassword = "Password is too short.";
                    this.errorpassword = "massage-error";
                  }
                  else {
                    // Display a generic error message for other errors
                    this.errorMessage = "An error occurred. Please try again.";
                  }
                } else {
                  // Handle cases where this.errorData is undefined or not in the expected format
                  this.errorMessage = "An unexpected error occurred. Please try again.";
                }
              }
            );
        }
    }
  }


  isSame: boolean | null = null;
  typingTimer: any;
  passwordInputRepeat: string = '';
  

  checkIfSame() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.isSame = this.passwordInputRepeat === this.passwordInput;
    }, 100);
  }

  clearTimer() {
    clearTimeout(this.typingTimer);
  }

  OnClickInput(){
    this.errorName = '';
    this.errorMessageName = "";
    this.everyThinkOk = true;
  }
  OnClickInputEmail(){
    this.errorEmail = '';
    this.errorMessageEmail = "";
    this.everyThinkOk = true;
  }
  OnClickInputPassword(){
    this.errorpassword = '';
    this.errorMessagePassword = "";
    this.everyThinkOk = true;
  }
  OnClickInputPasswordMatch(){
    this.errorpasswordMatch = '';
  }

  OnClickInputAgree(){
    if(!this.isChecked){this.erroragree = '';}
  }

  private deCode(t : string){
    return JSON.parse(atob(t.split(".")[1]));
  }

  private pass: string = '';
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
