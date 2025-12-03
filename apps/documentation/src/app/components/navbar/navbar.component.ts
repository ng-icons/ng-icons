import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { NAV_LINKS } from '../../constants/nav-link.constant';

@Component({
  selector: 'app-navbar',
  imports: [NgIconComponent, RouterLink],
  providers: [provideIcons({ bootstrapGithub })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  protected readonly showBlurredNavbar: Signal<string>;
  protected readonly navLinks = NAV_LINKS;

  constructor() {
    this.showBlurredNavbar = toSignal(
      fromEvent(window, 'scroll').pipe(
        map(() => (window.scrollY > 0 ? 'bg-black/5 backdrop-blur-sm' : '')),
        distinctUntilChanged(),
      ),
      { initialValue: '' },
    );
  }
}
