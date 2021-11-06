import { Component } from '@angular/core';
import * as octIcons from '@ng-icons/octicons';

@Component({
  selector: 'app-octicons',
  templateUrl: './octicons.component.html',
  styleUrls: ['./octicons.component.css'],
})
export class OcticonsComponent {
  icons = octIcons;
}
