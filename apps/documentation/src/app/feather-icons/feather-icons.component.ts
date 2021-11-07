import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';
import { IconPageComponent } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-feather-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class FeatherIconsComponent extends IconPageComponent {
  iconset = featherIcons;
  library = 'feather-icons';
}
