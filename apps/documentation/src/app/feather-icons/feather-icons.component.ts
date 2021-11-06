import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';

@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss'],
})
export class FeatherIconsComponent {
  icons = featherIcons;
}
