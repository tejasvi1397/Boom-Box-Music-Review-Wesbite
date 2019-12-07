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

}
