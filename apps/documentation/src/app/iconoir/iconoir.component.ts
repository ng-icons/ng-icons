import * as iconset from '@ng-icons/iconoir';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-iconoir',
  templateUrl: './iconoir.component.html',
  styleUrls: ['./iconoir.component.css'],
})
export class IconoirComponent {
  iconset = iconset;
}
