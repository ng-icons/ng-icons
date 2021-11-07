import { Component } from '@angular/core';
import * as jamIcons from '@ng-icons/jam-icons';
import { IconPageComponent } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-jam-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class JamIconsComponent extends IconPageComponent {
  iconset = jamIcons;
  library = 'jam-icons';
}
