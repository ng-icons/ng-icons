import { Component } from '@angular/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-tabler-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class TablerIconsComponent extends IconPageDirective {
  iconset = tablerIcons;
  library = 'tabler-icons';
  website = 'https://tabler-icons.io/';
  license = 'MIT';
}
