import { Injectable } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: UsersService,
    private router: Router) {}

  canActivate(): boolean {
    if(this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
