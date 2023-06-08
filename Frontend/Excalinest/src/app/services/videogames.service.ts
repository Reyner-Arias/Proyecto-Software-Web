import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient, private router: Router) { }

  //private adminAPI = 'http://localhost:3000/admin-videogames'
  //private devAPI = 'http://localhost:3000/dev-videogames'
  private adminAPI = environment.apiUrl + 'admin-videogames'
  private devAPI = environment.apiUrl + 'dev-videogames'

  private headers = new HttpHeaders({
    'enctype': 'multipart/form-data'
  });

  postVideogame (videogame: any) {
    //Pasar los datos del videojuego a un Form Data
    const videogameFormData = new FormData();
    videogameFormData.append('_id', videogame._id);
    videogameFormData.append('titulo', videogame.titulo);
    videogameFormData.append('sinopsis', videogame.sinopsis);
    videogameFormData.append('usuario', videogame.usuario);
    videogameFormData.append('tags', videogame.tags);
    videogameFormData.append('portada', videogame.coverFile);
    videogameFormData.append('archivo', videogame.zipFile);
    videogameFormData.append('facebook', videogame.facebookFile);
    videogameFormData.append('instagram', videogame.instaFile);
    videogameFormData.append('twitter', videogame.twitterFile);

    return this.http.post(`${this.adminAPI}/post`, videogameFormData, {headers: this.headers, responseType: 'text'});
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
    //Pasar los datos del videojuego a un Form Data
    const videogameFormData = new FormData();
    videogameFormData.append('_id', videogame._id);
    videogameFormData.append('bucketId', videogame.bucketId);
    videogameFormData.append('titulo', videogame.titulo);
    videogameFormData.append('sinopsis', videogame.sinopsis);
    videogameFormData.append('usuario', videogame.usuario);
    videogameFormData.append('tags', videogame.tags);
    videogameFormData.append('portada', videogame.coverFile);
    videogameFormData.append('archivo', videogame.zipFile);
    videogameFormData.append('facebook', videogame.facebookFile);
    videogameFormData.append('instagram', videogame.instaFile);
    videogameFormData.append('twitter', videogame.twitterFile);

    return this.http.put(`${this.adminAPI}/put`, videogameFormData, {headers: this.headers, responseType: 'text'});
  }

  getZipFile(body: any) {
    return this.http.post(`${this.adminAPI}/get-zip-file`, body, {responseType: 'blob'});
  }

  deleteZipFile(bucketId: any) {
    return this.http.delete(`${this.adminAPI}/delete-zip-file/${bucketId}`);
  }
  
}
