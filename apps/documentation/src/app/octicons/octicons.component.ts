import { Component } from '@angular/core';
import * as octIcons from '@ng-icons/octicons';

@Component({
  selector: 'app-octicons',
  templateUrl: './octicons.component.html',
})
export class OcticonsComponent {
  iconset = octIcons;
}
