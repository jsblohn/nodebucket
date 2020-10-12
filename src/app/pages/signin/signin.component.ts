/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Date:   24 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; TypeScript for Sign-In component of nodebucket
============================================
*/

/* Import required modules from Angular */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

// Export as SignInComponent
export class SignInComponent implements OnInit {

  // Create variables
  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {

   }

  ngOnInit(): void {
    // Use FormBuilder to create a new FormGroup with a FormControl named empId
    this.form = this.fb.group ({
      empId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const empId = this.form.controls['empId'].value;
    // Get the empId from the employees collection on MongoDB
    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res) {
        // Set the empId as the session_user and navigate to the home screen if the ID is valid
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/'])
      } else {
          this.error = 'The employee ID you entered is invalid, please try again.'
        }
    })
  }
}
