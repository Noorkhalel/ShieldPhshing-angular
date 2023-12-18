import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  data: {
    country: string;
    description: string;
    hostname: string;
    ip_address: string;
    online: string;
    url: string;
    verified: string;
  };
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('urlInput', { static: false }) urlInput!: ElementRef;

  textInput: string = '';
  isUrl: boolean | null = null;
  typingTimer: any;
  response: any;

  
  checkUrl() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      const urlPattern = new RegExp(
        '^(https?://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?$'
      );
      this.isUrl = urlPattern.test(this.textInput);
    }, 100);
  }

  clearTimer() {
    clearTimeout(this.typingTimer);
  }

  onButtonClick() {
    this.clearTimer();
    this.checkUrl();
    // Add any additional logic you want to perform on button click
  }

  apiUrl = 'http://127.0.0.1:5001/api/v1/Ai/Check';
  inputUrl: string | undefined;
  responseData: ApiResponse | undefined;
  secretkey = 'Olk9ZWKmXEpXVPOVFxOSgmFQaUFYsFMkw7i30ByIsUHykjMhnK'
  constructor(private http: HttpClient) { }
  
  displayTextMessage: string = '';
  icon_onl: string ='';
  color_onl:string ='';
  icon_tyoe: string ='';
  color_tyoe: string ='';
  disply_none:string ='';
  isLoading: boolean = false;

  displayText() {
    if (this.textInput.trim() === '') {
      this.displayTextMessage = '*Please enter a URL';
    } else {
      // Set isLoading to true before making the API request
      this.isLoading = true;
  
      const requestBody = { "url": this.textInput, "secretkey": this.secretkey };
      this.http.post<ApiResponse>(this.apiUrl, requestBody, { responseType: 'json' })
        .subscribe(
          (response) => {
            console.log('Response:', response);
  
            this.responseData = response;
            if (this.responseData && this.responseData.data.online === "Yes") {
              this.icon_onl = 'fa-regular fa-circle-check';
              this.color_onl = "text-success";
            } else {
              this.icon_onl = 'fa-regular fa-circle-xmark';
              this.color_onl = "text-danger";
            }
            if (this.responseData && this.responseData.data.description === "The URL is legitimate") {
              this.icon_tyoe = 'fa-regular fa-circle-check';
              this.color_tyoe = "text-success";
            } else {
              this.icon_tyoe = 'fa-regular fa-circle-xmark';
              this.color_tyoe = "text-danger";
            }
  
            // Set isLoading to false after the API request is complete
            this.isLoading = false;
          },
          (error) => {
            console.error('Error:', error);
  
            // Set isLoading to false in case of an error
            this.isLoading = false;
          }
        );
  
      this.disply_none = "d-none";
    }
  }
  // ////
  
}
