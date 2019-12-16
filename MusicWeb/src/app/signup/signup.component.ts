import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup_user_data: Object;
  Email: string;
  Password: string;
  // check_flag: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {}
  signup_user(){
    let user_details = {
      Email: this.Email,
      Password: this.Password
    };
    // this.check_flag = 1;
    console.log(`test ${this.Email}`)
    this._http.post_signup_user(JSON.stringify(user_details)).subscribe(data => {
      this.signup_user_data = data;
      alert("Verification Email has been sent to your email address. Please verify the email to proceed to login!");
      console.log(`check ${data}`);
    },
    err => {
      console.log(err.error);
      alert(err.error);
    })
  }
  //for form validation
  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
}

  