import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
interface ApiResponse {
  data: {
    type: string;
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
  warningService: any;

  
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

  // apiUrl = 'http://127.0.0.1:5001/api/v1/Ai/Check';
  // inputUrl: string | undefined;
  // responseData: ApiResponse | undefined;
  // secretkey = 'oY3VkOMkrAmlu3msYcKsGJB4CDetMRzRyCM3F8olQRfhLUsMWY'
  // constructor(private http: HttpClient) { }
  
  // displayTextMessage: string = '';
  // icon_onl: string ='';
  // color_onl:string ='';
  // icon_tyoe: string ='';
  // color_tyoe: string ='';
  // disply_none:string ='';
  // isLoading: boolean = false;

  // displayText() {
  //   if (this.textInput.trim() === '') {
  //     this.displayTextMessage = '*Please enter a URL';
  //   } else {
  //     // Set isLoading to true before making the API request
  //     this.isLoading = true;
  //     this.responseData = undefined;
  //     const requestBody = { "url": this.textInput, "secretkey": this.secretkey };
  //     this.http.post<ApiResponse>(this.apiUrl, requestBody, { responseType: 'json' })
  //       .subscribe(
  //         (response) => {
  //           console.log('Response:', response);
  
  //           this.responseData = response;
  //           if (this.responseData && this.responseData.data.online === "Yes") {
  //             this.icon_onl = 'fa-regular fa-circle-check';
  //             this.color_onl = "text-success";
  //           } else {
  //             this.icon_onl = 'fa-regular fa-circle-xmark';
  //             this.color_onl = "text-danger";
  //           }
  //           if (this.responseData && this.responseData.data.description === "The URL is legitimate") {
  //             this.icon_tyoe = 'fa-regular fa-circle-check';
  //             this.color_tyoe = "text-success";
  //           } else {
  //             this.icon_tyoe = 'fa-regular fa-circle-xmark';
  //             this.color_tyoe = "text-danger";
  //           }
  
  //           // Set isLoading to false after the API request is complete
  //           this.isLoading = false;
  //         },
  //         (error) => {
  //           console.error('Error:', error);
  
  //           // Set isLoading to false in case of an error
  //           this.isLoading = false;
  //         }
  //       );
  
  //     this.disply_none = "d-none";
  //   }
  // }
  // // ////
  apiUrl = 'http://127.0.0.1:5001/api/v1/Quick_check/Check';
  inputUrl: string | undefined;
  responseData: ApiResponse | undefined;
  secretkey = 'oY3VkOMkrAmlu3msYcKsGJB4CDetMRzRyCM3F8olQRfhLUsMWY'
  constructor(private http: HttpClient, private router: Router) { }
  
  displayTextMessage: string = '';
  icon_onl: string ='';
  color_onl:string ='';
  icon_tyoe: string ='';
  color_tyoe: string ='';
  disply_none:string ='';
  isLoading: boolean = false;
  danger:boolean=false;
  errorMessageCheck='';
  errorMessageChecka='';
  showAlert =false;
  showAlerta =false;
  displayText() {
    if (this.textInput.trim() === '') {
      this.displayTextMessage = '*Please enter a URL';
    } else {
      this.isLoading = true;
      this.responseData = undefined;
      const requestBody = { "url": this.textInput, "secretkey": this.secretkey };
      this.http.post<ApiResponse>(this.apiUrl, requestBody, { responseType: 'json' })
        .subscribe(
          (response) => {
            console.log('Response:', response);
  
            this.responseData = response;
            if (this.responseData && this.responseData.data.online.toLowerCase() === "yes".toLowerCase()) {
              this.icon_onl = 'fa-regular fa-circle-check';
              this.color_onl = "text-success";
            } else {
              this.icon_onl = 'fa-regular fa-circle-xmark';
              this.color_onl = "text-danger";
            }
            if (this.responseData && this.responseData.data.description.toLowerCase() === "The URL is legitimate".toLowerCase()) {
              this.icon_tyoe = 'fa-regular fa-circle-check';
              this.color_tyoe = "text-success";
              this.errorMessageChecka = 'This is a secure site. If you want to verify using artificial intelligence, ';
              this.showAlerta = true;
              setTimeout(() => {
                this.showAlerta = false;
                this.scrollToMultiAI();
              }, 3000);
              
              this.danger =false;
            } else {
              this.icon_tyoe = 'fa-regular fa-circle-xmark';
              this.color_tyoe = "text-danger";
              this.danger =true;
            }

            this.isLoading = false;
            
            
          },
          (error) => {
            console.error('Error:', error);
            this.errorMessageCheck = 'This URL unknown, for more advanced analysis';
            
            this.isLoading = false;
            this.showAlert = true;
            setTimeout(() => {
             this.showAlert = false;
            }, 2000);

            this.scrollToMultiAI();
           
          }
        );
  
      this.disply_none = "d-none";
    }
  }
  exit_dangar(){
    this.danger =false;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ChartShow();
      this.ChartShowTwo()
    }, 1000);
  }

  ChartShow() {
    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: [
          'phishing Url',
          'legal Url',
        ],
          datasets: [{label: 'Classification of discovered sites',
          data: [300329, 122003],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
       
          ],
          hoverOffset: 4
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  ChartShowTwo() {
    var myChartTwo = new Chart("myChartTwo", {
      type: 'line',
      data: {
        labels: [
          '2009 jan',
          '2009 jul',
          '2010 jan',
          '2010 jul',
          '2011 jan',
          '2011 jul',
          '2012 jan',
          '2012 jul',
          '2013 jan',
          '2013 jul',
          '2014 jan',
          '2014 jul',
          '2015 jan',
          '2015 jul',
          '2016 jan',
          '2016 jul',
          '2017 jan',
          '2017 jul',
          '2018 jan',
          '2018 jul',
          '2019 jan',
          '2019 jul',
          '2020 jan',
          '2020 jul',
          '2021 jan',
          '2021 jul',
          '2022 jan',
          '2022 jul',
        ],
        datasets: [{
          label: 'Company Phishing Attacks',
          data: [298, 284, 273, 374, 278, 284, 288,467,287,355,234,278,231,296,329,335,443,329,377,371,486,520,432,462,515,618,603,609,611],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
  });
  }

  isButtonActive = false;
  toggleButton() {
    if(!this.isButtonActive)
    this.isButtonActive = !this.isButtonActive;
  }
  isButtonActivedata = false;
  toggleButtondata() {
    if(!this.isButtonActivedata)
    this.isButtonActivedata = !this.isButtonActivedata;
  }
  isButtonActivemul = false;
  toggleButtondatamul() {
    if(!this.isButtonActivemul)
    this.isButtonActivemul = !this.isButtonActivemul;
  }
  visible = true;
  dismissible = true;

  onButtonClickMul(): void {
    setTimeout(() => {
      this.isButtonActivedata= true;
    }, 1000);

    setTimeout(() => {
      this.isButtonActive = true;
    }, 1500);

    setTimeout(() => {
      this.isButtonActivemul = true;
    }, 2000);
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },4000);
  }

  closeWarningb = false;
  closeWarning(){
    this.closeWarningb = !this.closeWarningb;
  }
  private showWarningSubject = new BehaviorSubject<boolean>(true);
  showWarning$ = this.showWarningSubject.asObservable();
  
  scrollToMultiAI(): void {
    // Logic to scroll to the section with id "multAI" goes here
    const multAISection = document.getElementById('multAI');
    if (multAISection) {
      multAISection.scrollIntoView({ behavior: 'smooth' });
      this.warningService.closeWarning();
    }
  }
}
function generateLabels(): unknown[] | undefined {
  throw new Error('Function not implemented.');
}

function generateData(): any {
  throw new Error('Function not implemented.');
}


