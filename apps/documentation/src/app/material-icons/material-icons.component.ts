import { Component } from '@angular/core';
import * as baselineIcons from '@ng-icons/material-icons/baseline';
import * as outlineIcons from '@ng-icons/material-icons/outline';
import * as roundIcons from '@ng-icons/material-icons/round';
import * as sharpIcons from '@ng-icons/material-icons/sharp';

@Component({
  selector: 'app-material-icons',
  templateUrl: './material-icons.component.html',
  styleUrls: ['./material-icons.component.css'],
})
export class MaterialIconsComponent {
  baselineIcons = baselineIcons;
  outlineIcons = outlineIcons;
  roundIcons = roundIcons;
  sharpIcons = sharpIcons;
}
