import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NavbarComponent } from './components/navbar/navbar.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { heroXMarkMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, RouterOutlet, NgIcon],
  viewProviders: [provideIcons({ heroXMarkMini })],
})
export class AppComponent implements OnInit {
  background = 'red';

  readonly dismissed = signal(localStorage.getItem('dismissed') === 'true');

  private readonly router = inject(Router);

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

  dismiss(): void {
    this.dismissed.set(true);
    localStorage.setItem('dismissed', 'true');
  }
}
