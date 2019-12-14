import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-delete',
  templateUrl: './playlist-delete.component.html',
  styleUrls: ['./playlist-delete.component.css']
})
export class PlaylistDeleteComponent implements OnInit {

  playlist_list: Object;
  playlist_data: Object;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this._http.get_playlists_admin_view().subscribe(data => {
      this.playlist_list = data;
      console.log(this.playlist_list);
    });
  }

  delete_playlist(id){
    console.log(id);
    this._http.delete_playlist(id).subscribe(data => {
      this.playlist_data = data
      window.location.reload();
      alert("Playlist Deleted!");
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
