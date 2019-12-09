import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {

  playlist_data: Object;
  Playlist_Title: string;
  Description: string;
  // Song_Title1: string;
  // Song_Title2: string;
  Song_Title_Playlist: Array<string> = [];
  check_flag: number;

  //for search song
  search_songs_results: Object;
  Search: string;
  

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  add_song_playlist(Song_Title){
    console.log(`Song title after adding to playlist ${Song_Title}`);
    this.Song_Title_Playlist.push(Song_Title);
    console.log('Inside func add_song_playlist');
    console.log(this.Song_Title_Playlist);
  }

  create_playlist(){
    // console.log(this.Song_Title1);
    // console.log(this.Song_Title2);
    console.log('Inside create_playlist function');
    console.log(this.Song_Title_Playlist);
    let playlist_details = {
      Playlist_Title: this.Playlist_Title,
      Description: this.Description,
      Song_Title: this.Song_Title_Playlist
    }
    this._http.post_playlist_create(JSON.stringify(playlist_details)).subscribe(data => {
      this.playlist_data = data
      alert("Playlist Added");
      console.log(this.playlist_data);
    },
    err => {
      if( err instanceof HttpErrorResponse ){
        if( err.status === 401 ) {
          this._router.navigate(['/login'])
        }
      }
    })
  }
  
  //to show the search box
  show_song_search(){
    this.check_flag = 1;
    console.log(this.check_flag);
  }

  //search songs
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

  //for form validation
  form = new FormGroup({
    Playlist_Title: new FormControl('', Validators.required)
  })

}
