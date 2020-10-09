/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date:   24 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; TypeScript for base-layout.component of nodebucket
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})


  /*window.addEventListener ('beforeunload', function() {
    delete ['cookieService'];

  });*/

//}

export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();


  constructor(private cookieService: CookieService, private router: Router, private elementRef: ElementRef) {
    /*elementRef.nativeElement.addEventListener
    ('beforeunload', () => {
      this.cookieService.delete(session_user)
    this.cookieService.deleteAll()});*/
  }

  ngOnInit(): void {
    // Delete any cookies that may be attached at initialization and render signin screen
    //this.cookieService.deleteAll();
   /* @HostListener('beforeunload'
      this.cookieService.deleteAll())*/
      this.elementRef.nativeElement.addEventListener
    ('beforeunload', () => {
      //this.cookieService.delete(session_user)
    this.cookieService.deleteAll()});
  }

  // Delete cookies on sign out and return to the signin screen
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
 /*class KillCookie {
    @HostListener('beforeunload', [CookieService.deleteAll()])*/


}
