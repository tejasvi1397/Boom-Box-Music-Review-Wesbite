import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get_trending_songs() {
    return this.http.get('http://localhost:8080/api/open/song')
  }
  
}
