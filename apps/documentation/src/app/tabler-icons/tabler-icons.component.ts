import { Component } from '@angular/core';
import * as tablerIcons from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-tabler-icons',
  templateUrl: './tabler-icons.component.html',
  styleUrls: ['./tabler-icons.component.css'],
})
export class TablerIconsComponent {
  icons = tablerIcons;
}
