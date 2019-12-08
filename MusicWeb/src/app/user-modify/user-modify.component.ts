import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent implements OnInit {

  all_users_list: Object;
  _id: string;
  user_data: Object;
  Email: string;
  Role: string;
  Account_Status: string;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  modify_user(){
    let user_details = {
      Email: this.Email,
      Role: this.Role,
      Account_Status: this.Account_Status
    };
    this._http.get_all_users().subscribe(data => {
      this.all_users_list = data;
      console.log(this.all_users_list);
      for(let i in this.all_users_list){
        if(this.all_users_list[i]['Email'] === this.Email){
          this._id = this.all_users_list[i]['_id'];
          console.log(this.all_users_list[i]);
          console.log(this._id);
        }
      }

      this._http.put_user_modify(JSON.stringify(user_details), this._id).subscribe(data => {
        this.user_data = data
        alert("User Modified")
        console.log(`User Modified ${this.user_data}`);
      },
      err => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 ) {
            this._router.navigate(['/login'])
          }
        }
      })
    })
  }

  //for form validation
  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email])
  })

}
