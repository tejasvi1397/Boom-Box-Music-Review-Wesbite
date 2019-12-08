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

  all_songs_list: Object;
  _id: string; 
  review_data: Object;
  Song_Title: string;
  Artist: string;
  Review_Comment: string;
  Rating: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  add_review(){
    let review_details = {
      Song_Title: this.Song_Title,
      Artist: this.Artist,
      Review_Comment: this.Review_Comment,
      Rating: this.Rating
    };
    this._http.get_all_songs().subscribe(data => {
      this.all_songs_list = data;
      console.log(this.all_songs_list);
      for(let i in this.all_songs_list){
        if(this.all_songs_list[i]['Song_Title'] === this.Song_Title && this.all_songs_list[i]['Artist'] === this.Artist){
          this._id = this.all_songs_list[i]['_id'];
          console.log(this.all_songs_list[i]);
          console.log(this._id);
        }
      }

      this._http.put_review_add(JSON.stringify(review_details), this._id).subscribe(data => {
        this.review_data = data
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
    });
  }

   //for form validation
   form = new FormGroup({
    Song_Title: new FormControl('', Validators.required),
    Artist: new FormControl('', Validators.required),
    Review_Comment: new FormControl('', Validators.required),
    Rating: new FormControl('', Validators.required)
  })

}
