import { NgClass } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [NgIconComponent, RouterLink, RouterLink, NgClass],
  providers: [provideIcons({ bootstrapGithub })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public readonly showBlurredNavbar: Signal<boolean>;

  constructor() {
    this.showBlurredNavbar = toSignal(
      fromEvent(window, 'scroll').pipe(
        map(() => window.scrollY > 0),
        distinctUntilChanged(),
      ),
      { initialValue: false },
    );
  }
}
