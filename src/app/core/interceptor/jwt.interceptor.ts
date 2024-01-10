import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppKeys } from '../constants/appSettings';
import { EncryptStorageService } from '../services/encrypt-storage.service';
import { RxJsUtils } from './../utils/rxjs.utils';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: EncryptStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = true; //this.authService.isLoggedIn;
    if (isLoggedIn) {
      let token = this.storageService.getLocalStorageItem(AppKeys.authToken);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    let apiUrl = environment.apiUrl;
    request = request.clone({
      url: `${apiUrl}/${request.url}`,
    });
    const { urlWithParams } = request;

    return next.handle(request).pipe(RxJsUtils.shareDuplicate(urlWithParams));
  }
}
