import { Component } from '@angular/core';
import * as jamIcons from '@ng-icons/jam-icons';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-jam-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class JamIconsComponent extends IconPageDirective {
  iconset = jamIcons;
  library = 'jam-icons';
  website = 'https://jam-icons.com/';
  license = 'MIT';
}
