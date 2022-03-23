import { Component } from '@angular/core';
import * as octIcons from '@ng-icons/octicons';
import * as largeOctIcons from '@ng-icons/octicons/large';

@Component({
  selector: 'app-octicons',
  templateUrl: './octicons.component.html',
})
export class OcticonsComponent {
  iconset = octIcons;
  largeIconset = largeOctIcons;
}
