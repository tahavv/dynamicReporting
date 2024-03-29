import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      if (this.authService.checkToken()) {
        return true;
      } else {
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
        return false; // Token is invalid or expired, redirect to login
      }
    } else {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
