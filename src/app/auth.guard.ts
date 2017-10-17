import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (JSON.parse(localStorage.getItem('currentUser')).accountType == "admin") {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to home page
    this.router.navigate(['/home-page']);
    return false;
  }
}