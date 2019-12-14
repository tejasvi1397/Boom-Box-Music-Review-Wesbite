import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.css']
})
export class PlaylistEditComponent implements OnInit {

  playlist_list_user: Object;
  edit_id: string;
  add_id: string;
  remove_id: string;
  playlist_data: Object;
  Playlist_Title: string;
  Description: string;
  Status: string;
  check_flag: number;

  //for search song
  search_songs_results: Object;
  Search: string;

  //for add_song_playlist
  songs_array_show_add: Array<string>;
  song_added: string;

  //for show remove_song
  songs_array_show_remove: Array<string>;

  //for removing song
  Song_Title_Removed: Array<string> = [];

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this._http.get_playlists_user().subscribe(data => {
      this.playlist_list_user = data;
      console.log(this.playlist_list_user);
      console.log('testing shuru playlist');
      // console.log(this.playlist_list_user[0].Songs[0].Song_Title);
    });
  }

  show_edit_playlist(playlist_id){
    this.check_flag = 1;
    this.edit_id = playlist_id;
    console.log('inside show edit songs function');
    console.log(this.edit_id);
  }

  edit_playlist(){
    console.log('inside edit_playlist func');
    console.log(this.edit_id);
    let playlist_details = {
      Playlist_Title: this.Playlist_Title,
      Description: this.Description,
      Status: this.Status
    };
    this._http.put_edit_playlist(JSON.stringify(playlist_details), this.edit_id).subscribe(data => {
      this.playlist_data = data
      // this._router.navigate(['/playlist_edit']);
      window.location.reload();
      alert("Playlist Updated");
      console.log(`Updated Playlist ${this.playlist_data}`);
    },
    err => {
      if( err instanceof HttpErrorResponse ){
        if( err.status === 401 ) {
          this._router.navigate(['/login'])
        }
      }
    })
  }

  show_add_songs_playlist(playlist_id, songs_in_playlist){
    this.check_flag = 2;
    this.add_id = playlist_id;
    this.songs_array_show_add = songs_in_playlist;
    console.log('inside show add songs function');
    console.log(this.add_id);
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

  add_song_playlist(Song_Title){
    console.log('inside add_song_playlist func');
    console.log(this.add_id);
    // console.log(this.playlist_list_user[0].Songs[0].Song_Title);
    console.log(`Song title after adding to playlist ${Song_Title}`);
    if(this.songs_array_show_add.includes(Song_Title)){
      alert('Song already in playlist');
    }
    else{
      this.song_added = Song_Title
      let playlist_details = {
        Song_Title: this.song_added
      };
      this._http.put_add_songs_playlist(JSON.stringify(playlist_details), this.add_id).subscribe(data => {
        this.playlist_data = data
        alert("Song Added to Playlist");
      },
      err => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 ) {
            this._router.navigate(['/login'])
          }
        }
      })
      // this.song_added_array.push(Song_Title);
    }
  }

  //remove songs
  show_remove_songs_playlist(playlist_id, songs_in_playlist){
    this.check_flag = 3;
    this.remove_id = playlist_id;
    this.songs_array_show_remove = songs_in_playlist;
    console.log('inside show remove songs function');
    console.log(this.remove_id);
    console.log(this.songs_array_show_remove);
  }

  add_songs_to_array(song_removed){
    console.log('Inside add song to array func');
    if(this.Song_Title_Removed.includes(song_removed)){
      let song_index = this.Song_Title_Removed.indexOf(song_removed);
      if(song_index > -1){
        this.Song_Title_Removed.splice(song_index, 1);
      }
      console.log('inside if');
      console.log(this.Song_Title_Removed);
    }
    else{
      this.Song_Title_Removed.push(song_removed);
      console.log('inside else');
      console.log(this.Song_Title_Removed);
    }
  }

  remove_song_playlist(){
    console.log('inside remove_song_playlist function');
    console.log(this.Song_Title_Removed);
    let playlist_details = {
      Song_Title: this.Song_Title_Removed
    }
    this._http.put_remove_songs_playlist(JSON.stringify(playlist_details), this.remove_id).subscribe(data => {
      this.playlist_data = data
      window.location.reload();
      alert("Song Removed from Playlist");
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
    Playlist_Title: new FormControl('', Validators.required)
  })

}
