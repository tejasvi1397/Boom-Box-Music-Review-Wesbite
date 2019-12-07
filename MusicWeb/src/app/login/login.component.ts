import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_user_data: Object;
  Email: string;
  Password: string;

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
      if(this.login_user_data['role'] == "Regular User"){
        this._router.navigate(['/login_success'])
      }
      else{
        this._router.navigate(['/admin'])
      }
    },
    err => console.log(err)
    )
  }

}
