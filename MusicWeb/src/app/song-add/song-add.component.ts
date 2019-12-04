import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

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
  Genre: number;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }
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
      this.song_data = data
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

}
