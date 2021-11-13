import { Component } from '@angular/core';
import * as tablerIcons from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-tabler-icons',
  templateUrl: './tabler-icons.component.html',
})
export class TablerIconsComponent {
  iconset = tablerIcons;
}
