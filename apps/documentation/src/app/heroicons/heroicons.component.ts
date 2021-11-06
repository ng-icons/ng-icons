import { Component } from '@angular/core';
import * as heroIcons from '@ng-icons/heroicons';

@Component({
  selector: 'app-heroicons',
  templateUrl: './heroicons.component.html',
  styleUrls: ['./heroicons.component.scss'],
})
export class HeroiconsComponent {
  icons = heroIcons;
}
