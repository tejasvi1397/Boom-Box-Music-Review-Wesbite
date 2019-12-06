import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trending_songs_list: Object;
  reviews_of_song_list: Object;
  check_flag: number;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.get_trending_songs().subscribe(data => {
      this.trending_songs_list = data;
      console.log(this.trending_songs_list);
      console.log('testing shuru');
      for(let i in this.trending_songs_list){
        console.log(this.trending_songs_list[i]);
        console.log(this.trending_songs_list[i]['Song_Title']);
      }
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
  
}
