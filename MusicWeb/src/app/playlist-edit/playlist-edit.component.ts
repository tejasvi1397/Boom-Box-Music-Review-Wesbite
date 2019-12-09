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
  _id: string;
  playlist_data: Object;
  Playlist_Title: string;
  Description: string;
  Status: string;
  check_flag: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this._http.get_playlists_user().subscribe(data => {
      this.playlist_list_user = data;
      console.log(this.playlist_list_user);
      console.log('testing shuru playlist');
      console.log(this.playlist_list_user[0].Songs[0].Song_Title);
    });
  }

  show_edit_playlist(playlist_id){
    this.check_flag = 1;
    this._id = playlist_id;
    console.log('inside show function');
    console.log(this._id);
  }

  edit_playlist(){
    console.log('inside edit_playlist func');
    console.log(this._id);
    let playlist_details = {
      Playlist_Title: this.Playlist_Title,
      Description: this.Description,
      Status: this.Status
    };
    this._http.put_edit_playlist(JSON.stringify(playlist_details), this._id).subscribe(data => {
      this.playlist_data = data
      // this._router.navigate(['/playlist_edit']);
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

  //for form validation
  form = new FormGroup({
    Playlist_Title: new FormControl('', Validators.required)
  })

}
