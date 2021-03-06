import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-song-delete',
  templateUrl: './song-delete.component.html',
  styleUrls: ['./song-delete.component.css']
})
export class SongDeleteComponent implements OnInit {

  all_songs_list: Object;
  _id: string; 
  song_data: Object;
  Song_Title: string;
  Artist: string;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  delete_song(){
    let song_details = {
      Song_Title: this.Song_Title,
      Artist: this.Artist
    };
    this._http.get_all_songs().subscribe(data => {
      this.all_songs_list = data;
      console.log(this.all_songs_list);
      console.log('testing shuru');
      console.log(this.Song_Title);
      for(let i in this.all_songs_list){
        if(this.all_songs_list[i]['Song_Title'] === this.Song_Title && this.all_songs_list[i]['Artist'] === this.Artist){
          this._id = this.all_songs_list[i]['_id'];
          console.log(this.all_songs_list[i]);
          console.log(this._id);
        }
      }
      this._http.delete_song(this._id).subscribe(data => {
        this.song_data = data
        alert("Song Deleted!")
        console.log(`Deleted Song ${this.song_data}`);
      },
      err => {
        if( err instanceof HttpErrorResponse ){
          if( err.status === 401 ) {
            this._router.navigate(['/login'])
          }
        }
      })
    })
  }
  //for form validation
  form = new FormGroup({
    Song_Title: new FormControl('', Validators.required),
    Artist: new FormControl('', Validators.required)
  })

}
