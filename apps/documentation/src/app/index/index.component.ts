/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';
import { FadeInContainerDirective } from '../directives/fade-in/fade-in-container.directive';
import { FadeInDirective } from '../directives/fade-in/fade-in.directive';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [
    NgIconComponent,
    RouterLink,
    FadeInContainerDirective,
    FadeInDirective,
  ],
  providers: [provideIcons({ heroChevronRightMini })],
})
export class IndexComponent {}
