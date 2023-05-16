import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = environment.apiUrl + 'admin-application';

  constructor(private http: HttpClient, private router: Router) { }

  postApplication(application: any) {
    return this.http.post<any>(`${this.apiUrl}/post`, application);
  }

  deleteApplication(body: any) {
    return this.http.delete(`${this.apiUrl}/delete`,  
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: body, });
  }

  getAll() {
    return this.http.get<any>(`${this.apiUrl}/get-all`);
  }

  getZipFile(body: any) {
    return this.http.post(`${this.apiUrl}/get-zip-file`, body, {responseType: 'text'});
  }
}
