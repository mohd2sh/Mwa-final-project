

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let user = this.auth.getSavedUser();
    if (user != null) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
         // 'Content-Type': 'application/json'

        },

        //url: apiUrl + request.url,
        //withCredentials: true

      });
    }






    return next.handle(request);
  }
}
