import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../../models/index';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, map, mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.apiUrl;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) {
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  login(user: LoginUser): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user)
  }

  socialLogin(): Observable<any> {
    return this.socialAuthService.authState.pipe(map((res: SocialUser) => res), mergeMap(data => {
      const obj = {
        token: data.idToken,
      }
      return this.http.post(`${this.baseURL}/verify-google-token`, obj)
    }));
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
      this.loggedIn.next(true);;
      return response;
    }));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
