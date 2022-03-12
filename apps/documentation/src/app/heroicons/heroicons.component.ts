import { Component } from '@angular/core';
import * as outlineIcons from '@ng-icons/heroicons/outline';
import * as solidIcons from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-heroicons',
  templateUrl: './heroicons.component.html',
})
export class HeroiconsComponent {
  outlineIcons = outlineIcons;
  solidIcons = solidIcons;
}
