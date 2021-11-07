import { Component } from '@angular/core';
import * as heroIcons from '@ng-icons/heroicons';
import { IconPageComponent } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-heroicons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class HeroiconsComponent extends IconPageComponent {
  iconset = heroIcons;
  library = 'heroicons';
  website = 'https://heroicons.com/';
  license = 'MIT';
}
