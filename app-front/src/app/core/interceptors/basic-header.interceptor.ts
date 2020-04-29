import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':  'application/json',
        'Access-Control-Allow-Methods':'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS'
      }
    });
    
    return next.handle(modifiedRequest);
  }
}
