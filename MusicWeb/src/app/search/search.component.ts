import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search_songs_results: Object;
  Search: string;

  reviews_of_song_list: Object;
  check_flag: number;

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }
  search_song(){
    let search_details = {
      Search : this.Search
    };
    this._http.post_search_songs(JSON.stringify(search_details)).subscribe(data => {
      this.search_songs_results = data
      console.log(this.search_songs_results);
    },
    err => console.log(err))
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
