import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLink],
  providers: [provideIcons({ bootstrapGithub })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @HostBinding('class.blurred')
  showBlurredNavbar = false;

  ngOnInit(): void {
    // monitor the scroll position and update the navbar accordingly
    fromEvent(window, 'scroll').subscribe(() => {
      this.showBlurredNavbar = window.scrollY > 0;
    });
  }
}
