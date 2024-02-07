import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable()
export class ServerErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toaster: ToasterService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              this.toaster.error('Unauthorized access!', 'Error');
            }
            else if (event.status == 200 && event.body.message) {
              this.toaster.success(event.body.message, 'Success');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            if (error.error) {
              this.toaster.error(error.error.error, 'Error');
            } else {
              this.toaster.error('Unauthorized access!', 'Error');
            }
          } else if (error.status === 404) {
            this.toaster.error('Page Not Found!', 'Error');
          } else if (error.error && error.error.error) {
            this.toaster.error(error.error.error, 'Error');
          }
        },
      })
    );
  }
}
