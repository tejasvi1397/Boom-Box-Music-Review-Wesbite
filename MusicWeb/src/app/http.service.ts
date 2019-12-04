import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get_trending_songs() {
    return this.http.get('http://localhost:8080/api/open/song')
  }

  post_signup_user(user_details): Observable<object>{
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
  
}
