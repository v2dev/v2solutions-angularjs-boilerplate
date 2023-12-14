import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../../models/index';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.apiUrl;
  isAuthenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(user: LoginUser): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user)
  }

  googleLogin(): Observable<any> {
    return this.http.get(`${this.baseURL}/google`);
  }

  register(userDetails: RegisterUser): Observable<any> {
    return this.http.post(`${this.baseURL}/signup`, userDetails)
  }

  forgotPassword(email: string): Observable<any> {
    const data = { email }
    return this.http.post(`${this.baseURL}/forgot-password`, data);
  }

  resetPassword(data: object): Observable<any> {
    return this.http.post(`${this.baseURL}/reset-password`, data);
  }

  verifyOtp(data: object): Observable<any> {
    return this.http.post(`${this.baseURL}/mfa-verify`, data).pipe(map(response => {
      this.isAuthenticated = true;
      return response;
    }));
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
