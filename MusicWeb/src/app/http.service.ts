import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  server_PORT: number = 8080;
  base_url_songs_open: string = `http://localhost:${this.server_PORT}/api/song/open`;
  base_url_songs_secure: string = `http://localhost:${this.server_PORT}/api/song/secure`;
  base_url_songs_admin: string = `http://localhost:${this.server_PORT}/api/song/admin`;
  base_url_reviews_open: string = `http://localhost:${this.server_PORT}/api/review/open`;
  base_url_reviews_secure: string = `http://localhost:${this.server_PORT}/api/review/secure`;
  base_url_users_secure: string = `http://localhost:${this.server_PORT}/api/secure`;
  base_url_users_admin: string = `http://localhost:${this.server_PORT}/api/admin`;
  base_url_playlists_secure: string = `http://localhost:${this.server_PORT}/api/playlist/secure`;
  base_url_playlists_admin: string = `http://localhost:${this.server_PORT}/api/playlist/admin`;
  

  constructor(private http: HttpClient, private _router: Router) { }

  get_all_songs(){
    return this.http.get(this.base_url_songs_open);
  }

  get_trending_songs() {
    return this.http.get(`${this.base_url_songs_open}/trending`);
  }

  get_all_users(){
    return this.http.get(`${this.base_url_users_admin}/users`);
  }

  get_reviews_open(id){
    return this.http.get(`${this.base_url_reviews_open}/${id}`);
  }

  post_signup_user(user_details): Observable<object>{
    return this.http.post(`${this.base_url_users_secure}/register`, user_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  post_login_user(user_details): Observable<object>{
    return this.http.post(`${this.base_url_users_secure}/login`, user_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  guard_loggedIn() {
    return !!localStorage.getItem('token'); //will return either true or false
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  post_song_add(song_details): Observable<object>{
    return this.http.post(`${this.base_url_songs_secure}/create`, song_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_song_update(song_details, id): Observable<object>{
    return this.http.put(`${this.base_url_songs_secure}/update/${id}`, song_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_review_add(review_details, id): Observable<object>{
    return this.http.put(`${this.base_url_reviews_secure}/create/${id}`, review_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  post_search_songs(search_details){
    return this.http.post(`${this.base_url_songs_open}/search`, search_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  delete_song(id){
    return this.http.delete(`${this.base_url_songs_admin}/delete/${id}`);
  }

  put_user_modify(user_details, id): Observable<object>{
    return this.http.put(`${this.base_url_users_admin}/update/${id}`, user_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_modify_song_status(song_details, id): Observable<object>{
    return this.http.put(`${this.base_url_songs_admin}/status/update/${id}`, song_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  post_playlist_create(playlist_details): Observable<object>{
    return this.http.post(`${this.base_url_playlists_secure}/create`, playlist_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  get_all_playlists() {
    return this.http.get(this.base_url_playlists_secure);
  }

  get_playlists_user(){
    return this.http.get(`${this.base_url_playlists_secure}/user`);
  }

  put_edit_playlist(playlist_details, id): Observable<object>{
    return this.http.put(`${this.base_url_playlists_secure}/update/${id}`, playlist_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_add_songs_playlist(playlist_details, id): Observable<object>{
    return this.http.put(`${this.base_url_playlists_secure}/add/songs/${id}`, playlist_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_remove_songs_playlist(playlist_details, id): Observable<object>{
    return this.http.put(`${this.base_url_playlists_secure}/remove/songs/${id}`, playlist_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  get_playlists_admin_view(){
    return this.http.get(this.base_url_playlists_admin);
  }

  delete_playlist(id){
    return this.http.delete(`${this.base_url_playlists_admin}/delete/${id}`);
  }

}
