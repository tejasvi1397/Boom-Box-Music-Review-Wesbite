import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit {

  playlist_list: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.get_all_playlists().subscribe(data => {
      this.playlist_list = data;
      console.log(this.playlist_list);
      console.log('testing shuru playlist');
      console.log(this.playlist_list[0].Songs[0].Song_Title);
    });
  }

}
