import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_user_data: Object;
  Email: string;
  Password: string;
  check_flag: number;
  login_user_data_resend: Object;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  login(){
    let user_details = {
      Email: this.Email,
      Password: this.Password
    };
    this._http.post_login_user(JSON.stringify(user_details)).subscribe(data => {
      this.login_user_data = data
      console.log(this.login_user_data);
      localStorage.setItem('token', this.login_user_data['token'])
      // console.log(this.login_user_data['token'])
      // console.log(this.login_user_data['role'])
      if(this.login_user_data['account_status'] == "Deactivated"){
        alert("Your account is deactivated. Please contact site manager to activate your account");
        this._http.logoutUser();
        // this._router.navigate(['/']);
      }
      else if(this.login_user_data['is_verified'] == false){
        // alert("Verifiation Email has been sent to your email address. Please verify your account");
        this._http.logoutUser();
        this.check_flag = 1;
      }
      else if(this.login_user_data['role'] == "Regular User" && this.login_user_data['is_verified'] == true){
        this._router.navigate(['/login_success'])
      }
      else if(this.login_user_data['role'] == "Admin" && this.login_user_data['is_verified'] == true){
        this._router.navigate(['/admin'] )
      }
    },
    err => {
      console.log(err);
      window.location.reload();
      alert(err.error);
    })
  }

  resend_email(){
    this.check_flag = 2;
    let user_details = {
      Email: this.Email,
      Password: this.Password
    };
    this._http.post_login_user(JSON.stringify(user_details)).subscribe(data =>{
      this.login_user_data_resend = data;
      console.log(this.login_user_data_resend);
      let resend_details = {
        Email: this.login_user_data_resend['email'],
        _id: this.login_user_data_resend['id']
      }
      this._http.post_resend_verify_email(JSON.stringify(resend_details)).subscribe(data => {
        alert('Verification Email Resent');
        console.log('Verification Email Resent');
        console.log(data);
      })
    })
  }

  //for form validation
  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required)
  })

}
