import { Component } from '@angular/core';
import * as akarIcons from '@ng-icons/akar-icons';

@Component({
  selector: 'app-akar-icons',
  templateUrl: './akar-icons.component.html',
  styleUrls: ['./akar-icons.component.css'],
})
export class AkarIconsComponent {
  iconset = akarIcons;
}
