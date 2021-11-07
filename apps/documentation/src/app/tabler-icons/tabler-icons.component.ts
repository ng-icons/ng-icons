import { Component } from '@angular/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import { IconPageComponent } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-tabler-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class TablerIconsComponent extends IconPageComponent {
  iconset = tablerIcons;
  library = 'tabler-icons';
  website = 'https://tabler-icons.io/';
  license = 'MIT';
}
