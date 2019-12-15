import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {

  song_data: Object;
  Song_Title: string;
  Artist: string;
  Album: string;
  Year: number;
  Comment: string;
  Genre: string;

  check_flag: number;

  all_songs_list: Object;
  _id: string; 
  review_data: Object;
  Review_Comment: string;
  Rating: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  //only add song
  add_song(){
    let song_details = {
      Song_Title: this.Song_Title,
      Artist: this.Artist,
      Album: this.Album,
      Year: this.Year,
      Comment: this.Comment,
      Genre: this.Genre
    };
    this._http.post_song_add(JSON.stringify(song_details)).subscribe(data => {
      this.song_data = data;
      alert("Song Added");
      console.log(this.song_data);
    },
    err => {
      if( err instanceof HttpErrorResponse ){
        if( err.status === 401 ) {
          this._router.navigate(['/login'])
        }
      }
    })
  }

//add song and review

show_add_review(){
  this.check_flag = 1;
}

add_song_and_review(){
  this.add_song();
  console.log('song added');
  
  let review_details = {
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
      window.location.reload();
      alert("Song and Review Added");
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
  Artist: new FormControl('', Validators.required)
})

form_review = new FormGroup({
  Review_Comment: new FormControl('', Validators.required),
  Rating: new FormControl('', Validators.required)
})

}
