import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Excalinest';
  showHead: boolean = false;

  ngOnInit() {}

  /* Cambiar '/get-videogames' por '/login' en sprint posterior */

  constructor(public router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/get-videogames') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
