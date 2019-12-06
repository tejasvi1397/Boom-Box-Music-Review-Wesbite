import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get_all_songs(){
    return this.http.get('http://localhost:8080/api/song/open')
  }

  get_trending_songs() {
    return this.http.get('http://localhost:8080/api/song/open')
  }

  get_reviews_open(id){
    return this.http.get(`http://localhost:8080/api/review/open/${id}`);
  }

  post_signup_user(user_details): Observable<object>{
    console.log(`in service log ${user_details}`);
    return this.http.post('http://localhost:8080/api/secure/register', user_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  post_login_user(user_details): Observable<object>{
    return this.http.post('http://localhost:8080/api/secure/login', user_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  guard_loggedIn() {
    return !!localStorage.getItem('token'); //will return either true or false
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  post_song_add(song_details): Observable<object>{
    return this.http.post('http://localhost:8080/api/song/secure/create', song_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_song_update(song_details, id): Observable<object>{
    return this.http.put(`http://localhost:8080/api/song/secure/update/${id}`, song_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  put_review_add(review_details, id): Observable<object>{
    return this.http.put(`http://localhost:8080/api/review/secure/create/${id}`, review_details, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
