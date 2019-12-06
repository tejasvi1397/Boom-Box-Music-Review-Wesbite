import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup_user_data: Object;
  Email: string;
  Password: string;

  constructor(private _http: HttpService) { }

  ngOnInit() {}
  signup_user(){
    let user_details = {
      Email: this.Email,
      Password: this.Password
    };
    console.log(`test ${this.Email}`)
    this._http.post_signup_user(JSON.stringify(user_details)).subscribe(data => {
      this.signup_user_data = data
      console.log(data);
    },
    err => console.log(err))
  }
}
