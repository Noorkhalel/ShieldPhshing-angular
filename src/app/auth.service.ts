import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5001/api/v1/user';
  private authTokenSubject = new BehaviorSubject<string | null>(this.getStoredAuthToken());

  authToken$: Observable<string | null> = this.authTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  private setAuthToken(token: string | null): void {
    this.authTokenSubject.next(token);
    // Store the token in browser storage
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  private getStoredAuthToken(): string | null {
    // Retrieve the token from browser storage
    return localStorage.getItem('authToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        const accessToken = response?.user?.access;
        if (accessToken) {
          this.setAuthToken(accessToken);
        }
      })
    );
  }
  signup(username:string, email: string, password: string,user_type:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password ,user_type }).pipe(
      tap((response) => {
        console.log(response.massage)
      })
    );
  }
  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/token/refresh`).pipe(
      tap((response) => {
        const accessToken = response?.access_token;
        if (accessToken) {
          this.setAuthToken(accessToken);
        }
      })
    );
  }

  getAccessToken(): string | null {
    return this.authTokenSubject.value;
  }

  logout(){
    this.setAuthToken(null);
  }
}
