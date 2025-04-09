import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

// Injectable decorator marks this class as available for dependency injection
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Inject the AuthService to access authentication token
  constructor(private auth: AuthService) {}

  // Intercept method is called for every HTTP request
  // It receives the request and a handler to continue the request chain
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the authentication token from the auth service
    const token = this.auth.getToken();

    // If a token exists, clone the request and add the Authorization header
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    // Pass the modified (or original) request to the next handler in the chain
    return next.handle(req);
  }
}
