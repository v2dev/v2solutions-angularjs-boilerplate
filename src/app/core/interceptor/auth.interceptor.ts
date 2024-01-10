import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = null; //this.authService.getToken()
    httpRequest.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });
    httpRequest.clone({ url: `${environment.apiUrl}/${httpRequest.url}` });
    return next.handle(httpRequest);
  }
}
