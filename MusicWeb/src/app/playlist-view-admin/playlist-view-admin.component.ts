import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-playlist-view-admin',
  templateUrl: './playlist-view-admin.component.html',
  styleUrls: ['./playlist-view-admin.component.css']
})
export class PlaylistViewAdminComponent implements OnInit {

  playlist_list: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.get_playlists_admin_view().subscribe(data => {
      this.playlist_list = data;
    });
  }


}
