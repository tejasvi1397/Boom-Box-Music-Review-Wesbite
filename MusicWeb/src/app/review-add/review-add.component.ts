import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {

  songs_list: Object;
  _id: string; 
  review_data: Object;
  Review_Comment: string;
  Rating: number;
  check_flag: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this._http.get_all_songs().subscribe(data => {
      this.songs_list = data;
      console.log(this.songs_list);
    });
  }

  show_add_review(id){
    this._id = id;
    this.check_flag = 1;
    console.log(this._id);
  }
  add_review(){
    let review_details = {
      Review_Comment: this.Review_Comment,
      Rating: this.Rating
    };
  this._http.put_review_add(JSON.stringify(review_details), this._id).subscribe(data => {
    this.review_data = data
    window.location.reload();
    alert("Review Added");
    console.log(`Review Added ${this.review_data}`);
  },
    err => {
      if( err instanceof HttpErrorResponse ){
        if( err.status === 401 ) {
            this._router.navigate(['/login'])
          }
        }
  })
}

   //for form validation
   form = new FormGroup({
    Review_Comment: new FormControl('', Validators.required),
    Rating: new FormControl('', Validators.required)
  })

}
