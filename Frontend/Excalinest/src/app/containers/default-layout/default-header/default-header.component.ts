import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private usersService: UsersService) {
    super();
  }

  logout() {
    this.usersService.logout();
  }
}
