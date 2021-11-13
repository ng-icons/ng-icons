import { Component } from '@angular/core';
import * as heroIcons from '@ng-icons/heroicons';

@Component({
  selector: 'app-heroicons',
  templateUrl: './heroicons.component.html',
})
export class HeroiconsComponent {
  iconset = heroIcons;
}
