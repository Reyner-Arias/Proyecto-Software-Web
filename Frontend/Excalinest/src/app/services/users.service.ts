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

  putUser(id: string, user: any) {
    return this.http.put(`${this.apiUrl}/put`+`/${id}`, user, {responseType: 'text'});
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
    this.router.navigate(['/login']);
  }

  getCurrentRole() {
    return localStorage.getItem('role');
  }
}
