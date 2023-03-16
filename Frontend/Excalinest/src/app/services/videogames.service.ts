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

  getVideogames(admin: boolean, developer: String) {
    if(admin) {
      return this.http.get<any>(this.adminGetAPI);
    } else {
      return this.http.get<any>(this.developerGetAPI+`/${developer}`);
    }
  }

  adminDeleteAPI = 'http://localhost:3000/admin-videogames/delete'

  deleteVideogame(body: any) {
    return this.http.delete(this.adminDeleteAPI,  { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      body: body, });
  }

  adminPutAPI = 'http://localhost:3000/admin-videogames/put'

  putVideogame(videogame: any) {
    return this.http.put(this.adminPutAPI, videogame, {responseType: 'text'});
  }

  adminGetZipFileAPI = 'http://localhost:3000/admin-videogames/get-zip-file'

  getZipFile(body: any) {
    return this.http.post(this.adminGetZipFileAPI, body, {responseType: 'text'});
  }

  adminDeleteZipFileAPI = 'http://localhost:3000/admin-videogames/delete-zip-file'

  deleteZipFile(bucketId: any) {
    return this.http.delete(this.adminDeleteZipFileAPI+`/${bucketId}`);
  }
  
}
