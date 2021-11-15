import { Component } from '@angular/core';
import * as materialIcons from '@ng-icons/material-icons';

@Component({
  selector: 'app-material-icons',
  templateUrl: './material-icons.component.html',
  styleUrls: ['./material-icons.component.css'],
})
export class MaterialIconsComponent {
  iconset = materialIcons;
}
