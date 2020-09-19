/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date:   19 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Typescript for Home Component
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
