import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_user_data: Object;
  Email: string;
  Password: string;

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }
  login(){
    let user_details = {
      Email: this.Email,
      Password: this.Password
    };
    this._http.post_login_user(JSON.stringify(user_details)).subscribe(data => {
      this.login_user_data = data
      localStorage.setItem('token', this.login_user_data['token'])
      console.log(this.login_user_data['token'])
    },
    err => console.log(err)
    )
  }

}
