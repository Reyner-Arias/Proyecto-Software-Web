import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { navItemsAdmin, navItemsDev, navItemsSupport } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems: any;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private usersService: UsersService) {}

  public getNavItems() {
    switch(this.usersService.getCurrentRole()) {
      case "desarrollador":
        return navItemsDev;
      case "administrador":
        return navItemsAdmin;
      case "soporte":
        return navItemsSupport;
      default:
        return navItemsDev;
    }
  }
}
