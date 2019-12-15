import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-songs-reviews-view',
  templateUrl: './songs-reviews-view.component.html',
  styleUrls: ['./songs-reviews-view.component.css']
})
export class SongsReviewsViewComponent implements OnInit {

  songs_list: Object;
  reviews_of_song_list: Object;
  check_flag: number;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.get_all_songs().subscribe(data => {
      this.songs_list = data;
      console.log(this.songs_list);
    });
  }

  show_review_for_song(song_id){
    this._http.get_reviews_open(song_id).subscribe(data => {
      this.reviews_of_song_list = data;
      this.check_flag = 1;
      console.log(this.reviews_of_song_list);
    })
  }
  show_all_reviews(){
    this.check_flag = 2;
  }
  hide_reviews(){
    this.check_flag = 3;
  }
}


