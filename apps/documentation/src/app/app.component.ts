import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  background = 'red';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this.background = 'red';
            break;
          case '/getting-started':
            this.background = 'blue';
            break;
          case '/browse-icons':
            this.background = 'blue';
            break;
        }
      }
    });
  }
}
