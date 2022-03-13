import * as iconset from '@ng-icons/simple-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-icons',
  templateUrl: './simple-icons.component.html',
  styleUrls: ['./simple-icons.component.css'],
})
export class SimpleIconsComponent {
  iconset = iconset;
}
