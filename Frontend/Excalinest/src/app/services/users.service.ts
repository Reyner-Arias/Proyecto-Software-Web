import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl + 'admin-users';

  constructor(private http: HttpClient, private router: Router) { }

  private headers = new HttpHeaders({
    'enctype': 'multipart/form-data'
  });

  postUser(user: any) {
    //Pasar los datos del usuario a un Form Data
    const userFormData = new FormData();
    userFormData.append('username', user.username);
    userFormData.append('email', user.email);
    userFormData.append('name', user.name);
    userFormData.append('type', user.type);
    userFormData.append('facebook', user.facebookFile);
    userFormData.append('instagram', user.instaFile);
    userFormData.append('twitter', user.twitterFile);

    return this.http.post(`${this.apiUrl}/post`, userFormData, {headers: this.headers, responseType: 'text'});
  }

  putUser(id: string, user: any) {
    //Pasar los datos del usuario a un Form Data
    const userFormData = new FormData();
    userFormData.append('username', user.username);
    userFormData.append('email', user.email);
    userFormData.append('name', user.name);
    userFormData.append('type', user.type);
    userFormData.append('facebook', user.facebookFile);
    userFormData.append('instagram', user.instaFile);
    userFormData.append('twitter', user.twitterFile);

    return this.http.put(`${this.apiUrl}/put`+`/${id}`, userFormData, {headers: this.headers, responseType: 'text'});
  }

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/get-all`);
  }

  deleteUser(email: String) {
    return this.http.delete<any>(`${this.apiUrl}/delete`+`/${email}`);
  }

  getUser(email: String) {
    return this.http.get<any>(`${this.apiUrl}/get`+`/${email}`);
  }
  
  mail(user: any){
    return this.http.post(`${this.apiUrl}/mail`, user, {responseType: 'text'});
  }
}
