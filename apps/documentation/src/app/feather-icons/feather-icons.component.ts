import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-feather-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class FeatherIconsComponent extends IconPageDirective {
  iconset = featherIcons;
  library = 'feather-icons';
  website = 'https://feathericons.com/';
  license = 'MIT';
}
