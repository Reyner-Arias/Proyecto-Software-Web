import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private apiUrl = 'http://localhost:3000/admin-tags';

  constructor(private http: HttpClient, private router: Router) { }

  postTag(tag: any) {
    return this.http.post<any>(`${this.apiUrl}/post`, tag);
  }

  putTag(tag: any) {
    return this.http.post<any>(`${this.apiUrl}/put`, tag);
  }

  getTags () {
    return this.http.get<any>(`${this.apiUrl}/get`);
  }

  getTag (id: Number) {
    return this.http.get<any>(`${this.apiUrl}/get`+`/${id}`);
  }

  getMaxId() {
    return this.http.get<any>(`${this.apiUrl}/getMaxId`);
  }

  deleteTag (id: Number) {
    return this.http.delete<any>(`${this.apiUrl}/delete`+`/${id}`);
  }

}