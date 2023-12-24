import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  message = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    // Redirect to login if no access token is present
    if (!this.authService.getAccessToken()) {
      this.router.navigate(['/login']);
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
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
          this.message = `Hi ${res.user.username}`;
        },
        error: (error) => {
          console.error('Dashboard request failed:', error);
          this.message = 'Dashboard request failed';
          // Handle error, show user-friendly message, etc.
        }
      });
  }
}
