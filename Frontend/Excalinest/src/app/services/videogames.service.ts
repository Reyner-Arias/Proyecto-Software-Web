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
    const videogameFormData = new FormData();
    videogameFormData.append('titulo', videogame.titulo);
    videogameFormData.append('sinopsis', videogame.sinopsis);
    videogameFormData.append('usuario', videogame.usuario);
    videogameFormData.append('imagepath', videogame.imagepath);
    videogameFormData.append('facepath', videogame.facepath);
    videogameFormData.append('instapath', videogame.instapath);
    videogameFormData.append('twitterpath', videogame.twitterpath);
    videogameFormData.append('filepath', videogame.filepath);
    videogameFormData.append('tags', videogame.tags);
    videogameFormData.append('portada', videogame.coverFile);
    videogameFormData.append('archivo', videogame.zipFile);
    videogameFormData.append('facebook', videogame.facebookFile);
    videogameFormData.append('instagram', videogame.instaFile);
    videogameFormData.append('twitter', videogame.twitterFile);

    const fieldNames: string[] = [];
    videogameFormData.forEach((value, key) => {
      fieldNames.push(key);
    });
    console.log(fieldNames); // ["nombre", "edad"]

    // Obtener los valores de los campos
    const fieldValues: string[] = [];
    videogameFormData.forEach((value) => {
      fieldValues.push(value.toString());
    });
    console.log(fieldValues); // ["John", "30"]

    return this.http.post(`${this.adminAPI}/post`, videogameFormData, {headers: this.headers});
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
