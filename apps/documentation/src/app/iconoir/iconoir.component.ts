import { Component } from '@angular/core';
import * as iconset from '@ng-icons/iconoir';
@Component({
  selector: 'app-iconoir',
  templateUrl: './iconoir.component.html',
  styleUrls: ['./iconoir.component.css'],
})
export class IconoirComponent {
  iconset = iconset;
}
