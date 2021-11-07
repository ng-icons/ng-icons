import { Component } from '@angular/core';
import * as heroIcons from '@ng-icons/heroicons';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-heroicons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class HeroiconsComponent extends IconPageDirective {
  iconset = heroIcons;
  library = 'heroicons';
  website = 'https://heroicons.com/';
  license = 'MIT';
}
