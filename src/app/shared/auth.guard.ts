/*
============================================
; Title:  auth.guard.js
; Author: Professor Krasso
; Date:   23 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
;Guard for Auth
============================================
*/
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser) {
      // If the empId is valid, allow sign in
      return true;
    } else {
      // Otherwise stay on the signin page
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
