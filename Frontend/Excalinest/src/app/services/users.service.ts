import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl + 'admin-users';

  constructor(private http: HttpClient, private router: Router) { }

  postUser(user: any) {
    return this.http.post(`${this.apiUrl}/post`, user, {responseType: 'text'});
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user, {responseType: 'text'});
  }

  putUser(id: string, user: any) {
    return this.http.put(`${this.apiUrl}/put`+`/${id}`, user, {responseType: 'text'});
  }

  putProfile(id: string, user: any) {
    return this.http.put(`${this.apiUrl}/put/profile`+`/${id}`, user, {responseType: 'text'});
  }

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/get-all`);
  }

  deleteUser(email: String) {
    return this.http.delete<any>(`${this.apiUrl}/delete`+`/${email}`);
  }

  getUser() {
    return this.http.get<any>(`${this.apiUrl}/get`);
  }

  login(email: String) {
    return this.http.get<any>(`${this.apiUrl}/login`+`/${email}`);
  }
  
  mail(user: any){
    return this.http.post(`${this.apiUrl}/mail`, user, {responseType: 'text'});
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getCurrentRole() {
    return localStorage.getItem('role');
  }
}
