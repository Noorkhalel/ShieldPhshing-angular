import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { userItmeBar } from './userItme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() collapsed = false;
  @Input() ScreenWidth = 0;
  fistLeName = '';
  username = '';
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    // Redirect to login if no access token is present
    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/login']);
    }
  }
  
  getHeadClass(): string{
    let styleClass = '';
    if(this.collapsed && this.ScreenWidth > 768){
      styleClass = 'head-trimmed';
    }else{
      styleClass = 'head-mid-screen';
    }
    return styleClass;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  userItme = userItmeBar;
  show = true;
  clickToName(){
    if(this.show){
      this.show = false;
    }else{
      this.show = true;
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
          this.fistLeName = `${firstLetter}`.toUpperCase();
          this.username = res.user.username;
        },
        error: (error) => {
          console.error('Dashboard request failed:', error);
          this.fistLeName = 'Dashboard request failed';
          this.authService.logout();
          this.router.navigate(['/home']);
        }
      });
  }
}