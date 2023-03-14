import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient, private router: Router) { }

  adminPostAPI = 'http://localhost:3000/admin-tags/post'

  postTag(tag: any) {
    return this.http.post<any>(this.adminPostAPI, tag);
  }
  

  adminGetAPI = 'http://localhost:3000/admin-tags/get'

  getTags () {
    return this.http.get<any>(this.adminGetAPI);
  }

  adminGetMaxIdAPI = 'http://localhost:3000/admin-tags/getMaxId'

  getMaxId () {
    return this.http.get<any>(this.adminGetMaxIdAPI);
  }

  adminDeleteAPI = 'http://localhost:3000/admin-tags/delete'

  deleteTag (id: Number) {
    return this.http.delete<any>(this.adminDeleteAPI+`/${id}`);
  }

}