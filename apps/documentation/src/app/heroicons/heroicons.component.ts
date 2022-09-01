import { Component } from '@angular/core';
import * as miniIcons from '@ng-icons/heroicons/mini';
import * as outlineIcons from '@ng-icons/heroicons/outline';
import * as solidIcons from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-heroicons',
  templateUrl: './heroicons.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
    `,
  ],
})
export class HeroiconsComponent {
  outlineIcons = outlineIcons;
  solidIcons = solidIcons;
  miniIcons = miniIcons;
}
