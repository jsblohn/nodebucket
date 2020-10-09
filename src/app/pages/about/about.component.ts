/*
============================================
; Title:  about.component.ts
; Author: Professor Krasso
; Date:   04 October 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Typescript for About Component
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
