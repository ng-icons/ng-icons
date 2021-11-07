import { Component } from '@angular/core';
import * as octIcons from '@ng-icons/octicons';
import { IconPageComponent } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-octicons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class OcticonsComponent extends IconPageComponent {
  iconset = octIcons;
  library = 'octicons';
  website = 'https://github.com/primer/octicons';
  license = 'MIT';
}
