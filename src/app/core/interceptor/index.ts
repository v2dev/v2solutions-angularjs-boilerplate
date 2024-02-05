import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ServerErrorHandlerInterceptor } from './server-error-handler.interceptor';
import { JwtInterceptor } from './jwt.interceptor';


export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

export const serverErrorHandlerInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorHandlerInterceptor, multi: true },
];

export const jwtInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];