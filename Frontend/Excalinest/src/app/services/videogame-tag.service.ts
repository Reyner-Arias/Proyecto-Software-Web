import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideogameTagService {

  private apiUrl = environment.apiUrl + 'videogame-tag';

  constructor(private http: HttpClient, private router: Router) { }

  
}
