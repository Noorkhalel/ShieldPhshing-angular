import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { Observable } from "rxjs";
@Component({
  selector: 'app-urllevel',
  templateUrl: './urllevel.component.html',
  styleUrls: ['./urllevel.component.scss']
})
export class URLlevelComponent implements AfterViewInit {
  cdr: any;


  constructor(private authService: AuthService, private http: HttpClient, private router: Router,private cdRef: ChangeDetectorRef) {
    // Redirect to login if no access token is present
    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/login']);
    }
  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.ChartShow();
    // }, 100);
  }
  firstName = '';

  
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
          const firstLetter = res.user.username;
          this.firstName = `${firstLetter}`;
        },
        error: (error) => {
          console.error('Dashboard request failed:', error);
          this.firstName = 'Dashboard request failed';
          // Handle error, show user-friendly message, etc.
          
        }
      });
  }

  
  

  linkMove = false;
  activeLink = 'DETECTION';

  linkMoveDetection(){
    if(this.linkMove ==true){
      this.linkMove = false;
      this.activeLink = 'DETECTION';
    }
    
  }
  linkMoveDetails(){
    if(this.linkMove == false){
      this.linkMove = true;
      this.activeLink = 'DETAILS';
    }
  }

  api_Ai = 'http://127.0.0.1:5001/api/v1/Ai_url/Check';
  secretkey = '7T7r6fVzEgxFmDmA472hyz9ByZvoO8TyJXMBIXRU2nhB8RsELi'
  isLoading: boolean = false;

  textInput= '';
  results: any;
  results1: any;
  results2: any;
  results3: any;
  cuont_the_detection=0;
  theTextResuls = '';
  colorResult = '';
  bgcolor = '';
  getAiResult(){
    this.isLoading = true;
    const requestBody = { "url": this.textInput, "secretkey": this.secretkey };
      this.http.post<Response>(this.api_Ai, requestBody, { responseType: 'json' })
        .subscribe(
          (response) => {
            console.log(response);
            this.results1 = response;
            
            this.results = this.results1.vendor_results_url.vendor_results;
            this.results3 = this.results1.vendor_results_host.vendor_results;
            this.results2 = this.results1.report;
            // console.log(this.results1.cuont_the_detection)
            this.cuont_the_detection = this.results1.vendor_results_host.cuont_the_detection;
            // console.log(this.results.description)
            if (this.results1.data.description.toLowerCase() === 'The URL is legitimate'.toLowerCase()) {
              this.theTextResuls = 'The URL is legitimate';
              this.colorResult = 'text-success';
              this.bgcolor = 'ring-2';
            } else if (this.results1.data.description.toLowerCase() === 'The URL is phishing'.toLowerCase()) {
              this.theTextResuls = 'The URL is phishing';
              this.colorResult = 'text-danger';
              this.bgcolor = 'ring';
            }else {
              this.theTextResuls = 'The URL is unknown';
              this.colorResult = 'text-warning';
              this.bgcolor = 'ring-3'
            }
          this.hostname = this.results1.report.hostname;
          this.url_scan = this.results1.report.url;
          this.status = this.results1.report.status;
          if (this.status.toLowerCase() == 'no'){
            this.online = "404";
          }else{
            this.online = "200";
          }
          this.ip_address = this.results1.report.ip_address;
          this.Body_Length =  this.results1.report.Body_Length;
          this.country = this.results1.report.country;
          this.data = this.results1.report.data;
          this.outgoingLinks = this.results1.report.Outgoing_links;
          this.colons = this.results1.report.url_Analysis.colons;
          this.periods = this.results1.report.url_Analysis.periods;
          this.dashes =  this.results1.report.url_Analysis.dashes;
          this.question_marks =  this.results1.report.url_Analysis.question_marks;
          this.percent_symbols = this.results1.report.url_Analysis.percent_symbols;
          this.hash_symbols = this.results1.report.url_Analysis.hash_symbols;
          this.shart= this.results1.report.url_Analysis.shart;
          this.ate = this.results1.report.url_Analysis.ate;
          this.dolar = this.results1.report.url_Analysis.dolar;
          this.isLoading = false;
          },
          (error) => {
            console.error('Error:', error);

            this.isLoading = false;

          }
        )
        }
 
  
  hostname = '';
  url_scan = '';
  status = '';
  online = '';
  ip_address = '';
  Body_Length = '';
  country = '';
  data = '';
  outgoingLinks: string[] = [];
  colons = '';
  periods= '';
  dashes = '';
  question_marks = '';
  percent_symbols = '';
  hash_symbols = '';
  shart = '';
  ate= '';
  dolar = '';
  handle_erorr = '';
  
}
