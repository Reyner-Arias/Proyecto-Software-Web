import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient, private router: Router) { }
  
  private adminAPI = environment.apiUrl + 'admin-videogames'
  private devAPI = environment.apiUrl + 'dev-videogames'

  postVideogame (videogame: any) {
    return this.http.post(`${this.adminAPI}/post`, videogame, {responseType: 'text'});
  }

  getVideogames(admin: boolean, developer: String) {
    if(admin) {
      return this.http.get<any>(`${this.adminAPI}/get`);
    } else {
      return this.http.get<any>(`${this.devAPI}/get/${developer}`);
    }
  }

  deleteVideogame(body: any) {
    return this.http.delete(`${this.adminAPI}/delete`,  
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: body, });
  }

  putVideogame(videogame: any) {
    return this.http.put(`${this.adminAPI}/put`, videogame, {responseType: 'text'});
  }

  getZipFile(body: any) {
    return this.http.post(`${this.adminAPI}/get-zip-file`, body, {responseType: 'text'});
  }

  deleteZipFile(bucketId: any) {
    return this.http.delete(`${this.adminAPI}/delete-zip-file/${bucketId}`);
  }
  
}
