import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient, private router: Router) { }

  adminPostAPI = 'http://localhost:3000/admin-videogames/post'

  postVideogame (videogame: any) {
    return this.http.post(this.adminPostAPI, videogame, {responseType: 'text'});
  }

  developerGetAPI = 'http://localhost:3000/dev-videogames/get'
  adminGetAPI = 'http://localhost:3000/admin-videogames/get'

  getDeveloperVideogames (developer: String) {
    return this.http.get<any>(this.developerGetAPI+`/${developer}`);
  }
}
