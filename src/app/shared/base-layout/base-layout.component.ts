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

export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();


  constructor(private cookieService: CookieService, private router: Router, private elementRef: ElementRef) {
    // Clear cookies if the user hits the "X" on their browser instead of signing out
    window.onbeforeunload = function() {
      console.log(this.sessionUser);
      cookieService.deleteAll('sessionUser')
    };
  }

  ngOnInit(): void {
  }

  // Delete cookies on sign out and return to the signin screen
  signOut() {
    console.log(this.cookieService.getAll());
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);

  }
}
