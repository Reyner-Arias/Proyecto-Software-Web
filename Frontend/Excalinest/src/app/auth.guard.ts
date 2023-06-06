import { Injectable } from '@angular/core';
import { UsersService } from './services/users.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: UsersService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean |
      UrlTree> | Promise<boolean | UrlTree> {
    return this.activatePermisos(route);
  }

  activatePermisos(route: any) {
    if(this.authService.loggedIn()) {
      switch(this.authService.getCurrentRole()) {
        case "desarrollador":
          if(route.data['usuario'] == 'desarrollador') {
            return true;
          }
          break;
        case "administrador":
          if(route.data['usuario'] == 'administrador' ||
            route.data['usuario'] == 'desarrollador' ||
            route.data['usuario'] == 'admin-soporte') {
            return true;
          }
          break;
        case "soporte":
          if(route.data['usuario'] == 'soporte' ||
            route.data['usuario'] == 'desarrollador' ||
            route.data['usuario'] == 'admin-soporte') {
            return true;
          }
          break;
        default:
          break;
      }
      this.router.navigate(['/videogames/get']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }  
}
