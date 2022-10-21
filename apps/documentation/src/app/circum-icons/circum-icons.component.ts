import { Component } from '@angular/core';
import * as iconset from '@ng-icons/circum-icons';

@Component({
  selector: 'app-circum-icons',
  templateUrl: './circum-icons.component.html',
  styleUrls: ['./circum-icons.component.css'],
})
export class CircumIconsComponent {
  iconset = iconset;
}
