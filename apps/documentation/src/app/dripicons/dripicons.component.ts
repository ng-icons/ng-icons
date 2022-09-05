import { Component } from '@angular/core';
import * as iconset from '@ng-icons/dripicons';

@Component({
  selector: 'app-dripicons',
  templateUrl: './dripicons.component.html',
  styleUrls: ['./dripicons.component.css'],
})
export class DripiconsComponent {
  iconset = iconset;
}
