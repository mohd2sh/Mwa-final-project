
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,public router: Router) { }
  canActivate(): boolean {

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['auth','login']);
      return false;
    }
    return true;
  }


}
