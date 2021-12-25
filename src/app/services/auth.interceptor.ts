import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private secureRoutes = [
    'https://webexapis.com/v1/teams',
    'https://webexapis.com/v1/rooms',
    'https://webexapis.com/v1/messages',
  ];
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.secureRoutes.find((x) => request.url.startsWith(x))) {
      return next.handle(request);
    }
    const token = this.authService.token;
    const token_type = this.authService.tokenType;

    if (!token) {
      return next.handle(request);
    }

    request = request.clone({
      headers: request.headers.set('Authorization', token_type + ' ' + token),
    });

    return next.handle(request);
  }
}
