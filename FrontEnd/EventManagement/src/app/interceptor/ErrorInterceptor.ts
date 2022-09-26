import { environment } from './../../environments/environment';

import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,private router: Router,private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {



            if (err.status === 401) {

              console.log(err)
                // auto logout if 401 response returned from api
                this.userService.logout();
                this.router.navigate(['auth','login']);

            }


            return throwError(err);
            //const error = err.error.message || err.statusText;
            //return throwError(error);
        }))
    }
}
