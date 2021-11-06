import { Component } from '@angular/core';
import * as jamIcons from '@ng-icons/jam-icons';

@Component({
  selector: 'app-jam-icons',
  templateUrl: './jam-icons.component.html',
  styleUrls: ['./jam-icons.component.css'],
})
export class JamIconsComponent {
  icons = jamIcons;
}
