import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trending_songs_list: Object;
  reviews_of_song_list: Object;

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
  
}
